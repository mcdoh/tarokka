import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '@/app/AppContext';
import { throttle, validTilt } from '@/tools';

import { thirtyFPS } from '@/constants/time';
import type { Tilt } from '@/types';

const ZERO_ROTATION = 'rotateX(0deg) rotateY(0deg)';

export default function TiltCard({
	children,
	cardIndex,
	className = '',
}: {
	children: React.ReactNode;
	cardIndex: number;
	className?: string;
}) {
	const cardRef = useRef<HTMLDivElement>(null);
	const [untilt, setUntilt] = useState(false);
	const { settings, tilts, setLocalTilt } = useAppContext();

	useEffect(() => {
		const card = cardRef.current;
		if (!card) return;

		const tilt = tilts[cardIndex];

		if (validTilt(tilt)) {
			setUntilt(false);
			card.style.transform = `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`;
		} else {
			setUntilt(true);
		}
	}, [tilts]);

	useEffect(() => {
		const card = cardRef.current;
		if (!card || !untilt) return;

		card.style.transform = ZERO_ROTATION;
	}, [untilt]);

	const handleMouseMove = throttle((e: React.MouseEvent) => {
		const card = cardRef.current;
		if (!card) return;

		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const rotateX = ((y - centerY) / centerY) * -20;
		const rotateY = ((x - centerX) / centerX) * 20;
		const percentX = x / rect.width;
		const percentY = y / rect.height;

		const newTilt: Tilt[] = [];
		newTilt[cardIndex] = {
			percentX,
			percentY,
			rotateX,
			rotateY,
		};

		setLocalTilt(newTilt);
	}, thirtyFPS);

	const handleMouseLeave = () => {
		setLocalTilt([]);
	};

	return (
		<div
			className={`group ${className}`}
			onMouseMove={settings.tilt ? handleMouseMove : undefined}
			onMouseLeave={handleMouseLeave}
		>
			<div
				ref={cardRef}
				onAnimationEnd={() => setUntilt(false)}
				className={`h-full w-full transition-transform ${untilt ? 'duration-500' : 'duration-0'}`}
			>
				{children}
			</div>
		</div>
	);
}
