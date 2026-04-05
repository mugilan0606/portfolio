import React, { useCallback, useEffect, useId, useRef, useState } from 'react';

const VB = { w: 200, h: 138 };

const EYE_L = { x: 78, y: 70 };
const EYE_R = { x: 122, y: 70 };
const MAX_PUPIL = 6.5;

type Reaction = {
	id: string;
	ms: number;
	pupils: { lx: number; ly: number; rx: number; ry: number };
};

const REACTIONS: Reaction[] = [
	{
		id: 'bonk',
		ms: 920,
		pupils: { lx: 5.4, ly: 0.6, rx: -5.4, ry: 0.6 },
	},
	{
		id: 'spin',
		ms: 1000,
		pupils: { lx: 0, ly: -5.2, rx: 0, ry: -5.2 },
	},
	{
		id: 'bounce',
		ms: 900,
		pupils: { lx: 5.8, ly: -1.2, rx: -5.8, ry: -1.2 },
	},
	{
		id: 'wobble',
		ms: 940,
		pupils: { lx: -5.2, ly: 0.4, rx: 5.2, ry: 0.4 },
	},
	{
		id: 'sproing',
		ms: 820,
		pupils: { lx: 0, ly: 0, rx: 0, ry: 0 },
	},
	{
		id: 'tipsy',
		ms: 1080,
		pupils: { lx: -4.2, ly: 2.4, rx: 4.8, ry: -1.6 },
	},
];

function lookOffset(
	mx: number,
	my: number,
	cx: number,
	cy: number,
	max: number
): { x: number; y: number } {
	const dx = mx - cx;
	const dy = my - cy;
	const d = Math.hypot(dx, dy);
	if (d < 1e-6) return { x: 0, y: 0 };
	if (d <= max) return { x: dx, y: dy };
	return { x: (dx / d) * max, y: (dy / d) * max };
}

/**
 * Animated robot face; pupils follow the pointer; each click picks a random micro-animation.
 */
export default function HeroCompactDiagram() {
	const uid = useId().replace(/:/g, '');
	const gradId = `hero-robot-face-${uid}`;
	const glowId = `hero-robot-glow-${uid}`;

	const svgRef = useRef<SVGSVGElement>(null);
	const leftPupilGRef = useRef<SVGGElement>(null);
	const rightPupilGRef = useRef<SVGGElement>(null);
	const reactionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const activeReactionRef = useRef<Reaction | null>(null);

	const targetRef = useRef({ lx: 0, ly: 0, rx: 0, ry: 0 });
	const currentRef = useRef({ lx: 0, ly: 0, rx: 0, ry: 0 });
	const lastPointerRef = useRef({ mx: 100, my: 72 });
	const rafRef = useRef(0);
	const reactionRunningRef = useRef(false);

	const [reacting, setReacting] = useState(false);
	const [reactionId, setReactionId] = useState<string | null>(null);

	const applyPupils = useCallback(() => {
		const c = currentRef.current;
		const t = targetRef.current;
		const k = 0.28;
		c.lx += (t.lx - c.lx) * k;
		c.ly += (t.ly - c.ly) * k;
		c.rx += (t.rx - c.rx) * k;
		c.ry += (t.ry - c.ry) * k;

		leftPupilGRef.current?.setAttribute(
			'transform',
			`translate(${c.lx}, ${c.ly})`
		);
		rightPupilGRef.current?.setAttribute(
			'transform',
			`translate(${c.rx}, ${c.ry})`
		);

		const err =
			Math.abs(t.lx - c.lx) +
			Math.abs(t.ly - c.ly) +
			Math.abs(t.rx - c.rx) +
			Math.abs(t.ry - c.ry);
		if (err > 0.04) {
			rafRef.current = requestAnimationFrame(applyPupils);
		} else {
			rafRef.current = 0;
		}
	}, []);

	const schedulePupils = useCallback(() => {
		if (rafRef.current) return;
		rafRef.current = requestAnimationFrame(applyPupils);
	}, [applyPupils]);

	const restorePupilsFromLastPointer = useCallback(() => {
		const { mx, my } = lastPointerRef.current;
		const l = lookOffset(mx, my, EYE_L.x, EYE_L.y, MAX_PUPIL);
		const rt = lookOffset(mx, my, EYE_R.x, EYE_R.y, MAX_PUPIL);
		targetRef.current = { lx: l.x, ly: l.y, rx: rt.x, ry: rt.y };
		schedulePupils();
	}, [schedulePupils]);

	useEffect(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

		const onMove = (e: PointerEvent) => {
			if (reduce.matches || reactionRunningRef.current) return;
			const svg = svgRef.current;
			if (!svg) return;
			const r = svg.getBoundingClientRect();
			if (r.width < 1 || r.height < 1) return;

			const mx = ((e.clientX - r.left) / r.width) * VB.w;
			const my = ((e.clientY - r.top) / r.height) * VB.h;
			lastPointerRef.current = { mx, my };

			const l = lookOffset(mx, my, EYE_L.x, EYE_L.y, MAX_PUPIL);
			const rt = lookOffset(mx, my, EYE_R.x, EYE_R.y, MAX_PUPIL);
			targetRef.current = { lx: l.x, ly: l.y, rx: rt.x, ry: rt.y };
			schedulePupils();
		};

		window.addEventListener('pointermove', onMove, { passive: true });
		return () => {
			window.removeEventListener('pointermove', onMove);
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, [schedulePupils]);

	useEffect(() => {
		return () => {
			if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
		};
	}, []);

	const playRandomReaction = useCallback(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce || reactionRunningRef.current) return;

		if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);

		const r = REACTIONS[Math.floor(Math.random() * REACTIONS.length)];
		activeReactionRef.current = r;

		reactionRunningRef.current = true;
		setReacting(true);
		setReactionId(r.id);
		targetRef.current = { ...r.pupils };
		schedulePupils();

		reactionTimerRef.current = setTimeout(() => {
			reactionTimerRef.current = null;
			reactionRunningRef.current = false;
			activeReactionRef.current = null;
			setReacting(false);
			setReactionId(null);
			restorePupilsFromLastPointer();
		}, r.ms);
	}, [restorePupilsFromLastPointer, schedulePupils]);

	return (
		<button
			type="button"
			className="hero-compact-diagram"
			aria-label="Robot — click for a random animation"
			aria-busy={reacting}
			disabled={reacting}
			onClick={playRandomReaction}
		>
			<div
				className={[
					'hero-robot-visual',
					reacting && reactionId
						? `hero-robot-visual--${reactionId}`
						: '',
				]
					.filter(Boolean)
					.join(' ')}
				style={
					reacting
						? ({
								'--reaction-ms': `${activeReactionRef.current?.ms ?? 920}ms`,
							} as React.CSSProperties)
						: undefined
				}
			>
				<svg
					ref={svgRef}
					className="hero-robot-svg"
					viewBox={`0 0 ${VB.w} ${VB.h}`}
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="xMidYMid meet"
				>
					<defs>
						<linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="var(--accent-color)" stopOpacity="0.18" />
							<stop offset="100%" stopColor="var(--accent-color)" stopOpacity="0.05" />
						</linearGradient>
						<filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
							<feGaussianBlur stdDeviation="1.2" result="b" />
							<feMerge>
								<feMergeNode in="b" />
								<feMergeNode in="SourceGraphic" />
							</feMerge>
						</filter>
					</defs>

					<g className="hero-robot-antenna">
						<line
							x1="100"
							y1="14"
							x2="100"
							y2="34"
							stroke="var(--accent-color)"
							strokeOpacity="0.65"
							strokeWidth="2.5"
							strokeLinecap="round"
						/>
						<circle
							cx="100"
							cy="10"
							r="5"
							fill="var(--accent-color)"
							fillOpacity="0.9"
							filter={`url(#${glowId})`}
						/>
					</g>

					<g className="hero-robot-face-bob">
						<rect
							className="hero-robot-head"
							x="38"
							y="32"
							width="124"
							height="96"
							rx="22"
							stroke="var(--accent-color)"
							strokeOpacity="0.8"
							strokeWidth="2"
							fill={`url(#${gradId})`}
						/>

						<line
							x1="48"
							y1="88"
							x2="56"
							y2="88"
							stroke="var(--accent-color)"
							strokeOpacity="0.35"
							strokeWidth="1.5"
							strokeLinecap="round"
						/>
						<line
							x1="144"
							y1="88"
							x2="152"
							y2="88"
							stroke="var(--accent-color)"
							strokeOpacity="0.35"
							strokeWidth="1.5"
							strokeLinecap="round"
						/>

						<g className="hero-robot-eyes-blink">
							<g className="hero-robot-eye hero-robot-eye--left">
								<ellipse
									cx="78"
									cy="70"
									rx="14"
									ry="15"
									stroke="var(--accent-color)"
									strokeOpacity="0.75"
									strokeWidth="1.5"
									fill="rgba(0,0,0,0.35)"
								/>
								<g ref={leftPupilGRef} className="hero-robot-pupil-wrap">
									<circle
										cx="78"
										cy="70"
										r="5"
										fill="var(--accent-color)"
										fillOpacity="0.95"
									/>
								</g>
							</g>
							<g className="hero-robot-eye hero-robot-eye--right">
								<ellipse
									cx="122"
									cy="70"
									rx="14"
									ry="15"
									stroke="var(--accent-color)"
									strokeOpacity="0.75"
									strokeWidth="1.5"
									fill="rgba(0,0,0,0.35)"
								/>
								<g ref={rightPupilGRef} className="hero-robot-pupil-wrap">
									<circle
										cx="122"
										cy="70"
										r="5"
										fill="var(--accent-color)"
										fillOpacity="0.95"
									/>
								</g>
							</g>
						</g>

						<g className="hero-robot-mouth-wrap">
							<path
								className="hero-robot-mouth"
								d="M 72 104 Q 100 118 128 104"
								stroke="var(--accent-color)"
								strokeOpacity="0.7"
								strokeWidth="2.25"
								strokeLinecap="round"
								fill="none"
							/>
						</g>
					</g>
				</svg>
			</div>
		</button>
	);
}
