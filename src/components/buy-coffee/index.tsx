import React from 'react';
import './buy-coffee.style.scss';

const BuyMeACoffee = () => {
	return (
		<a 
			href="https://www.buymeacoffee.com/yourusername" 
			target="_blank" 
			rel="noopener noreferrer"
			className="buy-coffee"
		>
			<svg 
				width="20" 
				height="20" 
				viewBox="0 0 24 24" 
				fill="none" 
				xmlns="http://www.w3.org/2000/svg"
			>
				<path 
					d="M2 21h20M6 18H5a2 2 0 01-2-2v-5a2 2 0 012-2h14a2 2 0 012 2v1" 
					stroke="currentColor" 
					strokeWidth="2" 
					strokeLinecap="round" 
					strokeLinejoin="round"
				/>
				<path 
					d="M6 9V7a1 1 0 011-1h10a1 1 0 011 1v2M8 21V9m8 12V9" 
					stroke="currentColor" 
					strokeWidth="2" 
					strokeLinecap="round" 
					strokeLinejoin="round"
				/>
			</svg>
			<span>Buy me a coffee</span>
		</a>
	);
};

export default BuyMeACoffee;