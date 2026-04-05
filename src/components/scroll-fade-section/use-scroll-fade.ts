import { useLayoutEffect, type RefObject } from 'react';
import { subscribeScrollFadeFrame } from './scroll-fade-frame';

function smoothstep(edge0: number, edge1: number, x: number): number {
	const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
	return t * t * (3 - 2 * t);
}

const ENTRANCE_SHIFT_PX = 32;

/**
 * Drives opacity / translate on `contentRef` via a shared rAF loop + direct DOM writes,
 * so the effect stays visible during Lenis smooth scrolling (no dependency on scroll events).
 */
export function useScrollFade(
	sectionEl: HTMLElement | null,
	contentRef: RefObject<HTMLDivElement | null>
): void {
	useLayoutEffect(() => {
		if (!sectionEl) return;

		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

		const apply = () => {
			const content = contentRef.current;
			if (!content) return;

			if (reduce.matches) {
				content.style.opacity = '1';
				content.style.transform = '';
				content.style.willChange = 'auto';
				return;
			}

			const rect = sectionEl.getBoundingClientRect();
			const vh = window.innerHeight;
			const c = vh * 0.5;
			const fadeBand = Math.max(200, vh * 0.5);
			const minOpacity = 0;

			let opacityIn = 1;
			let entranceT = 1;
			if (rect.top >= vh) {
				opacityIn = minOpacity;
				entranceT = 0;
			} else if (rect.top > vh - fadeBand) {
				entranceT = smoothstep(0, 1, (vh - rect.top) / fadeBand);
				opacityIn = minOpacity + (1 - minOpacity) * entranceT;
			}

			let opacityOut = 1;
			if (rect.bottom < c) {
				const past = c - rect.bottom;
				opacityOut =
					minOpacity +
					(1 - minOpacity) * (1 - smoothstep(0, fadeBand, past));
			}

			const opacity = Math.max(
				minOpacity,
				Math.min(1, Math.min(opacityIn, opacityOut))
			);

			const shiftY = (1 - entranceT) * ENTRANCE_SHIFT_PX;
			const transform =
				shiftY > 0.5 ? `translate3d(0, ${shiftY}px, 0)` : 'none';

			content.style.opacity = String(opacity);
			content.style.transform = transform === 'none' ? '' : transform;
			content.style.willChange = 'opacity, transform';
		};

		const onReduce = () => apply();
		reduce.addEventListener('change', onReduce);

		const unsubFrame = subscribeScrollFadeFrame(apply);
		apply();
		window.addEventListener('resize', apply, { passive: true });

		return () => {
			unsubFrame();
			reduce.removeEventListener('change', onReduce);
			window.removeEventListener('resize', apply);
			const content = contentRef.current;
			if (content) {
				content.style.removeProperty('opacity');
				content.style.removeProperty('transform');
				content.style.removeProperty('willChange');
			}
		};
	}, [sectionEl]);
}
