import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '@/app/AppContext';
import throttle from '@/tools/throttle';

import { thirtyFPS } from '@/constants/time';
import type { Tilt } from '@/types';

const ZERO_ROTATION = 'rotateX(0deg) rotateY(0deg)';

const tiltSheen = (sheen: HTMLDivElement, tiltX: number, tiltY: number) => {
	const rect = sheen.getBoundingClientRect();
	const centerX = rect.width / 2;
	const centerY = rect.height / 2;
	const sheenX = centerX + (tiltY / -20) * centerX;
	const sheenY = centerY + (tiltX / 20) * centerY;

	sheen.style.opacity = '1';
	sheen.style.backgroundImage = `
			radial-gradient(
				circle at
				${sheenX}px ${sheenY}px,
				#ffffff44,
				#0000000f
			)
		`;
};

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
	const sheenRef = useRef<HTMLDivElement>(null);
	const [untilt, setUntilt] = useState(false);
	const {
		gameData,
		settings: { tilt, remoteTilt },
		setTilt,
		tilt: localTilts,
	} = useAppContext();

	useEffect(() => {
		const card = cardRef.current;
		const sheen = sheenRef.current;
		if (!card || !sheen) return;

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
				tiltSheen(sheen, x, y);
			} else {
				setUntilt(true);
			}
		} else if (card.style.transform !== ZERO_ROTATION) {
			setUntilt(true);
		}
	}, [tilt, localTilts, gameData]);

	useEffect(() => {
		const card = cardRef.current;
		const sheen = sheenRef.current;
		if (!card || !sheen || !untilt) return;

		card.style.transform = ZERO_ROTATION;
		sheen.style.opacity = '0';
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

		const newTilt: Tilt[] = [];
		newTilt[cardIndex] = { rotateX, rotateY };

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
				<div
					ref={sheenRef}
					className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-tr from-transparent via-white/20 to-transparent mix-blend-screen opacity-0 transition-opacity duration-500"
				/>
			</div>
		</div>
	);
}
