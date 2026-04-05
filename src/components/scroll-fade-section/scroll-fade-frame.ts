/**
 * Single rAF loop for all scroll-fade sections so opacity/transform stay in sync with
 * smooth scroll (Lenis) without relying on scroll events or per-section React re-renders.
 */
const callbacks = new Set<() => void>();
let rafId = 0;

function frame() {
	if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
		callbacks.forEach((cb) => cb());
	}
	if (callbacks.size > 0) {
		rafId = requestAnimationFrame(frame);
	}
}

export function subscribeScrollFadeFrame(cb: () => void): () => void {
	callbacks.add(cb);
	if (callbacks.size === 1) {
		rafId = requestAnimationFrame(frame);
	}
	return () => {
		callbacks.delete(cb);
		if (callbacks.size === 0) {
			cancelAnimationFrame(rafId);
		}
	};
}
