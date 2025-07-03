import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '@/app/AppContext';

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

export default function Sheen({ cardIndex, className }: { cardIndex: number; className?: string }) {
	const sheenRef = useRef<HTMLDivElement>(null);
	const [untilt, setUntilt] = useState(false);
	const {
		gameData,
		settings: { tilt, remoteTilt },
		tilt: localTilts,
	} = useAppContext();

	useEffect(() => {
		const sheen = sheenRef.current;
		if (!sheen) return;

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

				tiltSheen(sheen, x, y);
			} else {
				setUntilt(true);
			}
		} else {
			setUntilt(true);
		}
	}, [tilt, localTilts, gameData]);

	useEffect(() => {
		const sheen = sheenRef.current;
		if (!sheen || !untilt) return;

		sheen.style.opacity = '0';
	}, [untilt]);

	return (
		<div
			ref={sheenRef}
			className={`
				absolute inset-0
				rounded-lg pointer-events-none
				transition-opacity duration-500
				bg-gradient-to-tr from-transparent via-white/20 to-transparent mix-blend-screen opacity-0
				${className}
			`}
		/>
	);
}
