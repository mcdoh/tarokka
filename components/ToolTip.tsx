'use client';
import React, { useRef, useState } from 'react';

type TooltipProps = {
	children: React.ReactNode;
	content: React.ReactNode;
	delay?: number;
	mobileDelay?: number;
};

export default function Tooltip({
	children,
	content,
	delay = 500,
	mobileDelay = 500,
}: TooltipProps) {
	const [show, setShow] = useState(false);
	const [pos, setPos] = useState({ x: 0, y: 0 });
	const delayTimeout = useRef<NodeJS.Timeout | null>(null);
	const longPressTimeout = useRef<NodeJS.Timeout | null>(null);

	const handleMouseEnter = () => {
		delayTimeout.current = setTimeout(() => setShow(true), delay);
	};

	const handleMouseLeave = () => {
		if (delayTimeout.current) clearTimeout(delayTimeout.current);
		setShow(false);
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		setPos({ x: e.clientX, y: e.clientY });
	};

	const handleTouchStart = () => {
		longPressTimeout.current = setTimeout(() => setShow(true), mobileDelay);
	};

	const handleTouchEnd = () => {
		if (longPressTimeout.current) clearTimeout(longPressTimeout.current);
		setShow(false);
	};

	return (
		<>
			<div
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onMouseMove={handleMouseMove}
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
			>
				{children}
			</div>
			<div
				className={`fixed w-[25vh] pointer-events-none z-50 text-xs bg-black text-white rounded border border-gray-300 px-2 py-1 transition-opacity duration-250 ${show ? 'opacity-100' : 'opacity-0'}`}
				style={{
					top: `${pos.y + 20}px`,
					left: `${pos.x + 20}px`,
				}}
			>
				{content}
			</div>
		</>
	);
}
