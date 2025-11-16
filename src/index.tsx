import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/home';
import Error from './pages/error';
import Layout from './pages/layout';
import Skills from './pages/skills';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import '@icon-park/react/styles/index.css';
import './index.css';
import './i18n';
import { Provider } from 'react-redux';
import { store } from '@/store';

const router = createBrowserRouter([
	{
		element: <Layout/>,
		children: [
			{
				path: "/",
				element: <Navigate to="/en" replace />,
			},
			{
				path: '/:lng',
				element: <Home/>,
				errorElement: <Error/>,
			},
			{
				path: '/:lng/skills',
				element: <Skills/>,
				errorElement: <Error/>,
			},
		],
	},
	{
		path: '/error',
		element: <Error/>,
		errorElement: <Error/>,
	},
	{
		path: '*',
		element: <Error/>,
		errorElement: <Error/>,
	},
]);

const CustomCursor = () => {
	const [position, setPosition] = useState({ x: -100, y: -100 });
	const [trailingPosition, setTrailingPosition] = useState({ x: -100, y: -100 });
	const [isClicking, setIsClicking] = useState(false);
	const [isHovering, setIsHovering] = useState(false);
	const [cursorColor, setCursorColor] = useState('255, 68, 68');
	const [distance, setDistance] = useState(0);

	useEffect(() => {
		// Update cursor color based on theme
		const updateCursorColor = () => {
			const theme = document.body.getAttribute('data-theme');
			const colorMap: { [key: string]: string } = {
				'hero': '255, 68, 68',
				'experience': '255, 140, 66',
				'projects': '0, 212, 170',
				'education': '191, 255, 0',
				'publications': '168, 85, 247',
				'skills': '96, 165, 250',
				'medium': '0, 212, 255',
			};
			setCursorColor(colorMap[theme || 'hero'] || '255, 68, 68');
		};

		updateCursorColor();

		const observer = new MutationObserver(() => updateCursorColor());
		observer.observe(document.body, {
			attributes: true,
			attributeFilter: ['data-theme']
		});

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setPosition({ x: e.clientX, y: e.clientY });
		};

		const handleMouseDown = () => setIsClicking(true);
		const handleMouseUp = () => setIsClicking(false);

		const handleMouseOver = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const isClickable = 
				target.tagName === 'A' ||
				target.tagName === 'BUTTON' ||
				target.onclick !== null ||
				target.closest('a') !== null ||
				target.closest('button') !== null ||
				window.getComputedStyle(target).cursor === 'pointer';
			setIsHovering(isClickable);
		};

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mousedown', handleMouseDown);
		document.addEventListener('mouseup', handleMouseUp);
		document.addEventListener('mouseover', handleMouseOver);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mousedown', handleMouseDown);
			document.removeEventListener('mouseup', handleMouseUp);
			document.removeEventListener('mouseover', handleMouseOver);
		};
	}, []);

	// Smooth trailing effect for outer circle
	useEffect(() => {
		let rafId: number;
		
		const animate = () => {
			setTrailingPosition((prev) => {
				const dx = position.x - prev.x;
				const dy = position.y - prev.y;
				const dist = Math.sqrt(dx * dx + dy * dy);
				
				// Update distance for scaling
				setDistance(dist);
				
				// Smooth interpolation
				return {
					x: prev.x + dx * 0.1,
					y: prev.y + dy * 0.1,
				};
			});
			
			rafId = requestAnimationFrame(animate);
		};

		rafId = requestAnimationFrame(animate);

		return () => cancelAnimationFrame(rafId);
	}, [position]);

	// Calculate scale based on distance - shrinks as it gets closer
	const calculateScale = () => {
		const maxDistance = 100; // Maximum distance to track
		const minScale = 0.3; // Minimum scale when caught up
		const maxScale = 1.5; // Maximum scale when far away
		
		// Normalize distance (0 to 1)
		const normalizedDistance = Math.min(distance / maxDistance, 1);
		
		// Scale from minScale to maxScale based on distance
		const baseScale = minScale + (maxScale - minScale) * normalizedDistance;
		
		// Apply additional scaling for click and hover
		if (isClicking) return baseScale * 1.3;
		if (isHovering) return baseScale * 1.2;
		return baseScale;
	};

	// Calculate opacity based on distance
	const calculateOpacity = () => {
		const maxDistance = 100;
		const normalizedDistance = Math.min(distance / maxDistance, 1);
		return 0.3 + normalizedDistance * 0.7; // Opacity from 0.3 to 1
	};

	return (
		<>
			{/* Inner dot - follows mouse directly */}
			<div
				style={{
					position: 'fixed',
					left: `${position.x}px`,
					top: `${position.y}px`,
					width: '8px',
					height: '8px',
					backgroundColor: `rgb(${cursorColor})`,
					borderRadius: '50%',
					pointerEvents: 'none',
					zIndex: 10000,
					transform: `translate(-50%, -50%) scale(${isClicking ? 1.5 : 1})`,
					transition: 'transform 0.15s ease, background-color 0.6s ease',
					mixBlendMode: 'difference',
				}}
			/>
			{/* Outer ring - lags behind with dynamic size */}
			<div
				style={{
					position: 'fixed',
					left: `${trailingPosition.x}px`,
					top: `${trailingPosition.y}px`,
					width: '30px',
					height: '30px',
					border: `2px solid rgba(${cursorColor}, ${calculateOpacity()})`,
					borderRadius: '50%',
					pointerEvents: 'none',
					zIndex: 9999,
					transform: `translate(-50%, -50%) scale(${calculateScale()})`,
					transition: 'border-color 0.6s ease',
				}}
			/>
			{/* Glow effect on click */}
			{isClicking && (
				<div
					style={{
						position: 'fixed',
						left: `${position.x}px`,
						top: `${position.y}px`,
						width: '80px',
						height: '80px',
						backgroundColor: `rgba(${cursorColor}, 0.3)`,
						borderRadius: '50%',
						pointerEvents: 'none',
						zIndex: 9998,
						transform: 'translate(-50%, -50%)',
						animation: 'cursorGlow 0.5s ease-out',
					}}
				/>
			)}
		</>
	);
};

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<Provider store={store}>
		<React.StrictMode>
			<RouterProvider router={router}/>
			<CustomCursor />
			<Tooltip id="tooltip-area"/>
		</React.StrictMode>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();