import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '@/app/AppContext';
import { validTilt } from '@/tools';

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
	const { tilts } = useAppContext();

	useEffect(() => {
		const sheen = sheenRef.current;
		if (!sheen) return;

		const tilt = tilts[cardIndex];

		if (validTilt(tilt)) {
			setUntilt(false);
			tiltSheen(sheen, tilt.percentX, tilt.percentY);
		} else {
			setUntilt(true);
		}
	}, [tilts]);

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
