import React from 'react';
import './ambient-background.scss';

/**
 * Lightweight CSS-only ambient layer (no WebGL). For Three.js ideas: floating
 * particles (Points + BufferGeometry), slow wireframe torus, shader gradient
 * plane, or react-three-fiber `<Stars />` / `<Float>` — keep draw calls low.
 */
function AmbientBackground() {
	return (
		<div className="ambient-background" aria-hidden="true">
			<div className="ambient-background__orb ambient-background__orb--a" />
			<div className="ambient-background__orb ambient-background__orb--b" />
			<div className="ambient-background__orb ambient-background__orb--c" />
			<div className="ambient-background__grid" />
		</div>
	);
}

export default AmbientBackground;
