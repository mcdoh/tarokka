import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '@/app/AppContext';
import throttle from '@/tools/throttle';

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
	const {
		gameData,
		settings: { tilt, remoteTilt },
		setTilt,
		tilt: localTilts,
	} = useAppContext();

	useEffect(() => {
		const card = cardRef.current;
		if (!card) return;

		if (tilt) {
			const rotateX = localTilts[cardIndex]?.rotateX || 0;
			const rotateY = localTilts[cardIndex]?.rotateY || 0;

			const tilts = remoteTilt
				? [...gameData.tilts[cardIndex], { rotateX, rotateY }]
				: [{ rotateX, rotateY }];

			const { totalX, totalY, count } = tilts
				.filter(({ rotateX, rotateY }) => !!rotateX && !!rotateY)
				.reduce(
					({ totalX, totalY, count }, { rotateX, rotateY }) => ({
						totalX: totalX + rotateX,
						totalY: totalY + rotateY,
						count: ++count,
					}),
					{ totalX: 0, totalY: 0, count: 0 },
				);

			if (count && (totalX || totalY)) {
				setUntilt(false);

				const x = totalX / count;
				const y = totalY / count;

				card.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
			} else {
				setUntilt(true);
			}
		} else if (card.style.transform !== ZERO_ROTATION) {
			setUntilt(true);
		}
	}, [tilt, localTilts, gameData]);

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

		setTilt(newTilt);
	}, thirtyFPS);

	const handleMouseLeave = () => {
		setTilt([]);
	};

	return (
		<div
			className={`group ${className}`}
			onMouseMove={tilt ? handleMouseMove : undefined}
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
