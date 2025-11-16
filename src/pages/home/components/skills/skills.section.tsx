import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Container from '@/components/container';
import './skills.style.scss';
import { ClassNames } from '@/modules/classNames';

interface SkillCategory {
	title: string;
	skills: string[];
	color: string;
}

function SkillsSection() {
	const CN = new ClassNames('skills-section');
	const canvasRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [draggedBubble, setDraggedBubble] = useState<any>(null);
	const [bubbles, setBubbles] = useState<any[]>([]);
	const bubblesRef = useRef<any[]>([]);
	const animationRef = useRef<number>();
	const [bubbleSizes, setBubbleSizes] = useState({ category: 200, skill: 40 });

	const categories: SkillCategory[] = useMemo(() => [
		{
			title: 'Programming Languages',
			skills: ['Python', 'JavaScript', 'Java', 'C', 'C++'],
			color: '#60a5fa'
		},
		{
			title: 'Frameworks & Libraries',
			skills: ['Node.js', 'React', 'Flutter', 'Ansible', 'TensorFlow', 'PyTorch', 'Angular', 'Express.js'],
			color: '#34d399'
		},
		{
			title: 'Infrastructure',
			skills: ['ESXi', 'Baremetal', 'HANA DB', 'RHEL', 'SUSE Linux'],
			color: '#f472b6'
		},
		{
			title: 'Databases',
			skills: ['Redis', 'PostgreSQL', 'MongoDB', 'Firebase'],
			color: '#fbbf24'
		},
		{
			title: 'Cloud & DevOps',
			skills: ['Docker', 'Kubernetes', 'CI/CD', 'Git'],
			color: '#a78bfa'
		},
		{
			title: 'Tools',
			skills: ['REST API', 'HashiCorp', 'vCenter'],
			color: '#fb923c'
		}
	], []);

	// Responsive bubble sizes based on screen width
	const updateBubbleSizes = useCallback(() => {
		const width = window.innerWidth;
		
		if (width <= 480) {
			// Small mobile
			setBubbleSizes({ category: 90, skill: 25 });
		} else if (width <= 768) {
			// Mobile
			setBubbleSizes({ category: 110, skill: 30 });
		} else if (width <= 1024) {
			// Tablet
			setBubbleSizes({ category: 130, skill: 33 });
		} else if (width <= 1440) {
			// Laptop (most common)
			setBubbleSizes({ category: 160, skill: 38 });
		} else if (width <= 1920) {
			// Full HD Monitor
			setBubbleSizes({ category: 190, skill: 42 });
		} else {
			// Large 4K Monitor
			setBubbleSizes({ category: 220, skill: 45 });
		}
	}, []);

	useEffect(() => {
		updateBubbleSizes();
		window.addEventListener('resize', updateBubbleSizes);
		return () => window.removeEventListener('resize', updateBubbleSizes);
	}, [updateBubbleSizes]);

	const updateBubblePositions = useCallback(() => {
		const container = canvasRef.current;
		if (!container) return;

		const bubbleElements = container.querySelectorAll('.skills-section__bubble');
		bubbleElements.forEach((element: any, index) => {
			const bubble = bubblesRef.current[index];
			if (bubble) {
				element.style.transform = `translate(${bubble.x - bubble.radius}px, ${bubble.y - bubble.radius}px)`;
			}
		});
	}, []);

	const animate = useCallback(() => {
		const container = canvasRef.current;
		if (!container) return;

		const width = container.clientWidth;
		const height = container.clientHeight;

		bubblesRef.current.forEach((bubble, index) => {
			if (draggedBubble === bubble) return;

			// Keep skill bubbles inside their parent category bubble
			if (bubble.type === 'skill') {
				const parent = bubblesRef.current.find(b => b.type === 'category' && b.title === bubble.parentCategory);
				if (parent) {
					const dx = parent.x - bubble.x;
					const dy = parent.y - bubble.y;
					const distance = Math.sqrt(dx * dx + dy * dy);
					const maxDistance = parent.radius - bubble.radius - 10;
					
					// Strong force to keep inside parent
					if (distance > maxDistance) {
						const force = 0.05;
						bubble.vx += (dx / distance) * force;
						bubble.vy += (dy / distance) * force;
						
						// Hard boundary - don't let it escape
						const angle = Math.atan2(bubble.y - parent.y, bubble.x - parent.x);
						bubble.x = parent.x + Math.cos(angle) * maxDistance;
						bubble.y = parent.y + Math.sin(angle) * maxDistance;
					}
				}
			}

			// Apply velocity with damping
			bubble.vx *= 0.98;
			bubble.vy *= 0.98;
			
			bubble.x += bubble.vx;
			bubble.y += bubble.vy;

			// Bounce off walls (only for category bubbles)
			if (bubble.type === 'category') {
				if (bubble.x - bubble.radius < 0 || bubble.x + bubble.radius > width) {
					bubble.vx *= -0.8;
					bubble.x = Math.max(bubble.radius, Math.min(width - bubble.radius, bubble.x));
				}
				if (bubble.y - bubble.radius < 0 || bubble.y + bubble.radius > height) {
					bubble.vy *= -0.8;
					bubble.y = Math.max(bubble.radius, Math.min(height - bubble.radius, bubble.y));
				}
			}

			// Repulsion between category bubbles to prevent overlap
			if (bubble.type === 'category') {
				bubblesRef.current.forEach((other) => {
					if (other.type === 'category' && other !== bubble) {
						const dx = other.x - bubble.x;
						const dy = other.y - bubble.y;
						const distance = Math.sqrt(dx * dx + dy * dy);
						const minDist = bubble.radius + other.radius + 20; // 20px gap between categories

						if (distance < minDist && distance > 0) {
							const force = 0.1;
							const pushX = (dx / distance) * force;
							const pushY = (dy / distance) * force;
							
							bubble.vx -= pushX;
							bubble.vy -= pushY;
							other.vx += pushX;
							other.vy += pushY;
							
							// Separate them immediately if overlapping
							const overlap = minDist - distance;
							const separateX = (dx / distance) * (overlap / 2);
							const separateY = (dy / distance) * (overlap / 2);
							
							bubble.x -= separateX;
							bubble.y -= separateY;
							other.x += separateX;
							other.y += separateY;
						}
					}
				});
			}

			// Repulsion between skill bubbles in the same category
			if (bubble.type === 'skill') {
				bubblesRef.current.forEach((other) => {
					if (other.type === 'skill' && other.parentCategory === bubble.parentCategory && other !== bubble) {
						const dx = other.x - bubble.x;
						const dy = other.y - bubble.y;
						const distance = Math.sqrt(dx * dx + dy * dy);
						const minDist = bubble.radius + other.radius + 10; // 10px gap between skills

						if (distance < minDist && distance > 0) {
							const force = 0.15;
							const pushX = (dx / distance) * force;
							const pushY = (dy / distance) * force;

							bubble.vx -= pushX;
							bubble.vy -= pushY;
							other.vx += pushX;
							other.vy += pushY;

							// Immediate separation if overlapping
							const overlap = minDist - distance;
							if (overlap > 0) {
								const separateX = (dx / distance) * (overlap / 2);
								const separateY = (dy / distance) * (overlap / 2);
								
								bubble.x -= separateX;
								bubble.y -= separateY;
								other.x += separateX;
								other.y += separateY;
							}
						}
					}
				});
			}
		});

		updateBubblePositions();
		animationRef.current = requestAnimationFrame(animate);
	}, [draggedBubble, updateBubblePositions]);

	const initializeBubbles = useCallback(() => {
		const container = canvasRef.current;
		if (!container) return;

		const containerWidth = container.clientWidth;
		const containerHeight = container.clientHeight;
		const newBubbles: any[] = [];

		// Responsive layout
		const screenWidth = window.innerWidth;
		const isMobile = screenWidth <= 768;
		const isLaptop = screenWidth <= 1440;
		const isMonitor = screenWidth <= 1920;
		const categoriesPerRow = isMobile ? 2 : 3;
		const categorySpacing = isMobile ? 160 : isLaptop ? 280 : isMonitor ? 340 : 400;
		const skillSpacing = isMobile ? 30 : isLaptop ? 45 : isMonitor ? 55 : 65;

		categories.forEach((category, categoryIndex) => {
			// Position categories in a grid to avoid initial overlap
			const row = Math.floor(categoryIndex / categoriesPerRow);
			const col = categoryIndex % categoriesPerRow;
			const categoryStartX = (containerWidth - (categoriesPerRow - 1) * categorySpacing) / 2;
			const categoryStartY = isMobile ? 150 : 200;
			
			const categoryBubble = {
				type: 'category',
				title: category.title,
				color: category.color,
				x: categoryStartX + col * categorySpacing + (Math.random() - 0.5) * 30,
				y: categoryStartY + row * categorySpacing + (Math.random() - 0.5) * 30,
				vx: (Math.random() - 0.5) * 0.5,
				vy: (Math.random() - 0.5) * 0.5,
				radius: bubbleSizes.category,
				skills: category.skills
			};

			newBubbles.push(categoryBubble);

			// Calculate grid layout for skills inside the bubble
			const skillCount = category.skills.length;
			const cols = Math.ceil(Math.sqrt(skillCount));
			const rows = Math.ceil(skillCount / cols);
			const skillStartX = -(cols - 1) * skillSpacing / 2;
			const skillStartY = -(rows - 1) * skillSpacing / 2;

			category.skills.forEach((skill, skillIndex) => {
				const skillCol = skillIndex % cols;
				const skillRow = Math.floor(skillIndex / cols);
				const offsetX = skillStartX + skillCol * skillSpacing + (Math.random() - 0.5) * 15;
				const offsetY = skillStartY + skillRow * skillSpacing + (Math.random() - 0.5) * 15;
				
				newBubbles.push({
					type: 'skill',
					name: skill,
					color: category.color,
					x: categoryBubble.x + offsetX,
					y: categoryBubble.y + offsetY,
					vx: (Math.random() - 0.5) * 0.3,
					vy: (Math.random() - 0.5) * 0.3,
					radius: bubbleSizes.skill,
					parentCategory: category.title,
					parentX: categoryBubble.x,
					parentY: categoryBubble.y
				});
			});
		});

		bubblesRef.current = newBubbles;
		setBubbles([...newBubbles]);
	}, [categories, bubbleSizes]);

	useEffect(() => {
		initializeBubbles();
		animate();
		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [bubbleSizes]);

	const handleMouseDown = (e: React.MouseEvent, bubble: any) => {
		e.preventDefault();
		setIsDragging(true);
		setDraggedBubble(bubble);
		bubble.vx = 0;
		bubble.vy = 0;
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging || !draggedBubble) return;

		const container = canvasRef.current;
		if (!container) return;

		const rect = container.getBoundingClientRect();
		draggedBubble.x = e.clientX - rect.left;
		draggedBubble.y = e.clientY - rect.top;
	};

	const handleMouseUp = () => {
		if (draggedBubble) {
			draggedBubble.vx = (Math.random() - 0.5) * 0.3;
			draggedBubble.vy = (Math.random() - 0.5) * 0.3;
		}
		setIsDragging(false);
		setDraggedBubble(null);
	};

	return (
		<section className={CN.generate()} data-theme="skills">
			<Container>
				<h2 className={CN.generate('section-title')}>Skills</h2>
				<div 
					className={CN.generate('canvas')}
					ref={canvasRef}
					onMouseMove={handleMouseMove}
					onMouseUp={handleMouseUp}
					onMouseLeave={handleMouseUp}
				>
					{bubbles.map((bubble, index) => (
						<div
							key={index}
							className={CN.generate('bubble', [bubble.type])}
							style={{
								width: bubble.radius * 2,
								height: bubble.radius * 2,
								backgroundColor: bubble.type === 'category' ? bubble.color + '15' : bubble.color + '40',
								borderColor: bubble.color,
								borderWidth: bubble.type === 'category' ? '3px' : '2px',
								cursor: isDragging && draggedBubble === bubble ? 'grabbing' : 'grab',
								zIndex: bubble.type === 'category' ? 1 : 2
							}}
							onMouseDown={(e) => handleMouseDown(e, bubble)}
						>
							<span style={{ color: bubble.color }}>
								{bubble.type === 'category' ? bubble.title : bubble.name}
							</span>
						</div>
					))}
				</div>
			</Container>
		</section>
	);
}

export default SkillsSection;