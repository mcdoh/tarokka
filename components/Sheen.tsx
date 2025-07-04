import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '@/app/AppContext';

const tiltSheen = (sheen: HTMLDivElement, x: number, y: number) => {
	const rect = sheen.getBoundingClientRect();
	const sheenX = rect.width - x * rect.width;
	const sheenY = rect.height - y * rect.height;

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
			const percentX = localTilts[cardIndex]?.percentX || -1;
			const percentY = localTilts[cardIndex]?.percentY || -1;

			const percentages = remoteTilt
				? [...gameData.tilts[cardIndex], { percentX, percentY }]
				: [{ percentX, percentY }];

			const { totalX, totalY, count } = percentages
				.filter(({ percentX, percentY }) => percentX >= 0 && percentY >= 0)
				.reduce(
					({ totalX, totalY, count }, { percentX, percentY }) => ({
						totalX: totalX + percentX,
						totalY: totalY + percentY,
						count: ++count,
					}),
					{ totalX: 0, totalY: 0, count: 0 },
				);

			if (count && totalX >= 0 && totalY >= 0) {
				const x = totalX / count;
				const y = totalY / count;

				tiltSheen(sheen, x, y);
				setUntilt(false);
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
