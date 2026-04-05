import React, { forwardRef, useCallback, useRef, useState } from 'react';
import { useScrollFade } from './use-scroll-fade';
import './scroll-fade-section.scss';

type ScrollFadeSectionProps = React.HTMLAttributes<HTMLElement> & {
	children: React.ReactNode;
};

function assignRef<T>(ref: React.ForwardedRef<T>, value: T | null) {
	if (typeof ref === 'function') ref(value);
	else if (ref) (ref as React.MutableRefObject<T | null>).current = value;
}

const ScrollFadeSection = forwardRef<HTMLElement, ScrollFadeSectionProps>(
	function ScrollFadeSection({ children, className, style, ...rest }, forwardedRef) {
		const [node, setNode] = useState<HTMLElement | null>(null);
		const contentRef = useRef<HTMLDivElement>(null);
		useScrollFade(node, contentRef);

		const setRef = useCallback(
			(el: HTMLElement | null) => {
				setNode(el);
				assignRef(forwardedRef, el);
			},
			[forwardedRef]
		);

		return (
			<section
				ref={setRef}
				{...rest}
				className={['scroll-fade-section', className].filter(Boolean).join(' ')}
				style={{ background: 'transparent', ...style }}
			>
				<div ref={contentRef} className="scroll-fade-section__content">
					{children}
				</div>
			</section>
		);
	}
);

export default ScrollFadeSection;
