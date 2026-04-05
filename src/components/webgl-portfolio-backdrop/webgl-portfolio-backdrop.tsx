import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import './webgl-portfolio-backdrop.scss';

const STAR_COUNT = 96;

/** World units per second — stars drift to +X (right on screen) while idle */
const DRIFT_X_UNITS_PER_SEC = 0.078;

const starVertexShader = /* glsl */ `
attribute float twinklePhase;
uniform float uTime;
uniform float uScroll;
uniform float uDriftX;
uniform float uPixelRatio;
uniform float uWrapX;
uniform float uWrapY;

varying float vPhase;

/* Tile into a box matching the visible frustum so stars stay on-screen while scrolling */
void main() {
  vPhase = twinklePhase;
  vec3 pos = position;

  /* Slow horizontal drift (time-based); vertical motion still comes from scroll only */
  pos.x += uTime * uDriftX;

  float y = pos.y - uScroll * 0.018;
  float wy = max(uWrapY, 1.0);
  y = y - wy * floor((y + wy * 0.5) / wy);
  pos.y = y;

  float x = pos.x;
  float wx = max(uWrapX, 1.0);
  x = x - wx * floor((x + wx * 0.5) / wx);
  pos.x = x;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  float baseSize = 1.05 * uPixelRatio;
  gl_PointSize = max(1.5, baseSize * (140.0 / max(-mvPosition.z, 0.15)));
  gl_Position = projectionMatrix * mvPosition;
}
`;

const starFragmentShader = /* glsl */ `
uniform vec3 uColor;
uniform float uTime;
varying float vPhase;

void main() {
  vec2 c = gl_PointCoord - vec2(0.5);
  if (dot(c, c) > 0.25) discard;
  float v = fract(vPhase * 0.413);
  float speed = 0.8 + v * 3.2;
  float wave = sin(uTime * speed + vPhase * 6.28318530718);
  float tw = 0.22 + 0.78 * (0.5 + 0.5 * wave);
  tw = mix(0.35, 1.0, tw * tw);
  gl_FragColor = vec4(uColor, tw * 0.88);
}
`;

function GoldStarfield() {
	const matRef = useRef<THREE.ShaderMaterial>(null);
	const scrollRef = useRef(0);
	const { gl, camera, size } = useThree();

	const [positions, twinklePhase] = useMemo(() => {
		const pos = new Float32Array(STAR_COUNT * 3);
		const phase = new Float32Array(STAR_COUNT);
		for (let i = 0; i < STAR_COUNT; i++) {
			const y = (Math.random() - 0.5) * 200;
			const r = Math.sqrt(Math.random()) * 52;
			const theta = Math.random() * Math.PI * 2;
			pos[i * 3] = r * Math.cos(theta);
			pos[i * 3 + 1] = y + (Math.random() - 0.5) * 24;
			pos[i * 3 + 2] = r * Math.sin(theta) - 14;
			phase[i] = Math.random() * Math.PI * 2;
		}
		return [pos, phase];
	}, []);

	const uniforms = useMemo(
		() => ({
			uTime: { value: 0 },
			uDriftX: { value: DRIFT_X_UNITS_PER_SEC },
			uScroll: { value: 0 },
			uColor: { value: new THREE.Color('#d4af37') },
			uPixelRatio: { value: 1 },
			uWrapX: { value: 60 },
			uWrapY: { value: 60 },
		}),
		[]
	);

	useEffect(() => {
		const onScroll = () => {
			scrollRef.current = window.scrollY;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useFrame((state) => {
		const mat = matRef.current;
		if (!mat) return;
		mat.uniforms.uTime.value = state.clock.elapsedTime;
		mat.uniforms.uScroll.value = scrollRef.current;
		mat.uniforms.uPixelRatio.value = Math.min(gl.getPixelRatio(), 2);

		const cam = camera as THREE.PerspectiveCamera;
		if (cam.isPerspectiveCamera) {
			const fovRad = (cam.fov * Math.PI) / 180;
			const dist = 23;
			const halfH = Math.tan(fovRad / 2) * dist;
			const wrapY = Math.max(32, halfH * 2 * 1.22);
			const wrapX = wrapY * (size.width / Math.max(size.height, 1));
			mat.uniforms.uWrapY.value = wrapY;
			mat.uniforms.uWrapX.value = Math.max(32, wrapX);
		}
	});

	return (
		<points renderOrder={999}>
			<bufferGeometry>
				<bufferAttribute attach="attributes-position" args={[positions, 3]} />
				<bufferAttribute attach="attributes-twinklePhase" args={[twinklePhase, 1]} />
			</bufferGeometry>
			<shaderMaterial
				ref={matRef}
				uniforms={uniforms}
				vertexShader={starVertexShader}
				fragmentShader={starFragmentShader}
				transparent
				depthTest={false}
				depthWrite={false}
				blending={THREE.AdditiveBlending}
			/>
		</points>
	);
}

function WebglPortfolioBackdrop() {
	const [reduceMotion, setReduceMotion] = useState(
		() =>
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
	);

	useEffect(() => {
		const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
		const sync = () => setReduceMotion(mqReduce.matches);
		mqReduce.addEventListener('change', sync);
		return () => mqReduce.removeEventListener('change', sync);
	}, []);

	if (reduceMotion) return null;

	return (
		<div className="webgl-portfolio-backdrop" aria-hidden="true">
			<Canvas
				className="webgl-portfolio-backdrop__canvas"
				gl={{
					alpha: true,
					antialias: true,
					stencil: false,
					powerPreference: 'high-performance',
				}}
				camera={{ position: [0, 0, 9], fov: 48, near: 0.1, far: 80 }}
				dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
				onCreated={({ gl }) => {
					gl.setClearColor(0x000000, 0);
				}}
			>
				<GoldStarfield />
			</Canvas>
		</div>
	);
}

export default WebglPortfolioBackdrop;
