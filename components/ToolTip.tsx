'use client';
import { useRef, useState, ReactNode } from 'react';

type TooltipProps = {
	children: React.ReactNode;
	content: React.ReactNode;
	delay?: number;
	mobileDelay?: number;
	offsetX?: number;
	offsetY?: number;
	edgeBuffer?: number;
};

export default function Tooltip({
	children,
	content,
	delay = 500,
	mobileDelay = 500,
	offsetX = 20,
	offsetY = 20,
	edgeBuffer = 10,
}: TooltipProps) {
	const ttRef = useRef<HTMLDivElement | null>(null);
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
		const { clientX: x, clientY: y } = e;
		const ttWidth = ttRef.current?.offsetWidth || 0;
		const ttHeight = ttRef.current?.offsetHeight || 0;
		const viewportWidth = window.innerWidth - edgeBuffer;
		const viewportHeight = window.innerHeight - edgeBuffer;
		const ttRight = ttWidth + offsetX + x;
		const ttBottom = ttHeight + offsetY + y;

		const adjustX = ttRight > viewportWidth ? ttRight - viewportWidth : 0;
		const adjustY = ttBottom > viewportHeight ? ttBottom - viewportHeight : 0;

		setPos({ x: x - adjustX, y: y - adjustY });
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
				ref={ttRef}
				className={`fixed max-w-[35vh] pointer-events-none z-50 text-xs bg-black text-white rounded-xl border border-gray-300 px-2 py-1 transition-opacity duration-250 ${content && show ? 'opacity-100' : 'opacity-0'}`}
				style={{
					top: `${pos.y + offsetY}px`,
					left: `${pos.x + offsetX}px`,
				}}
			>
				{content}
			</div>
		</>
	);
}
