import React, { lazy, Suspense, useEffect } from 'react';
import Header from '@/components/header';
import { setLanguage } from '@/store/uiSettings/uiSettingsSlice';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './style.scss';
import i18n from 'i18next';

const WebglPortfolioBackdrop = lazy(
	() => import('@/components/webgl-portfolio-backdrop/webgl-portfolio-backdrop')
);

const Layout = () => {
	const { lng } = useParams<{ lng: string }>();
	const dispatch = useDispatch();

	// Handle language updates
	useEffect(() => {
		if (lng != null) {
			dispatch(setLanguage(lng));
			void i18n.changeLanguage(lng);
		}
	}, [lng, dispatch]);

	useEffect(() => {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduceMotion) return;

		const lenis = new Lenis({
			duration: 1.15,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true,
			wheelMultiplier: 0.88,
			touchMultiplier: 1.15,
			autoRaf: true,
			anchors: true,
		});

		return () => {
			lenis.destroy();
		};
	}, []);

	// Scroll-based theme updater (disabled — single gold / black palette in reset.scss)
	// useEffect(() => {
	// 	const sections = document.querySelectorAll('section[data-theme]');
	// 	const observer = new IntersectionObserver(
	// 		(entries) => {
	// 			entries.forEach((entry) => {
	// 				if (entry.isIntersecting) {
	// 					const theme = entry.target.getAttribute('data-theme');
	// 					document.body.setAttribute('data-theme', theme!);
	// 				}
	// 			});
	// 		},
	// 		{ threshold: 0.3 }
	// 	);
	// 	sections.forEach((sec) => observer.observe(sec));
	// 	return () => observer.disconnect();
	// }, [location.pathname]);

	return (
		<>
			<Header />
			<Suspense fallback={null}>
				<WebglPortfolioBackdrop />
			</Suspense>
			<main className="layout-main">
				<Outlet />
			</main>
		</>
	);
};

export default Layout;
