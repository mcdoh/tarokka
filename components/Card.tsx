'use client';
import { useRef, useState } from 'react';

import tarokkaCards from '@/constants/tarokkaCards';
import getCardInfo from '@/tools/getCardInfo';

import { Layout, TarokkaGameCard } from '@/types';

const cardBack = tarokkaCards.find((card) => card.back)!;

type CardProps = {
	dm: boolean;
	card: TarokkaGameCard;
	position: Layout;
	flipAction: () => void;
};

export default function Card({ dm, card, position, flipAction }: CardProps) {
	const { aria, card: cardName, description, flipped, url } = card;

	const [showTooltip, setShowTooltip] = useState(false);
	const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
	const longPressTimeout = useRef<NodeJS.Timeout | null>(null);
	const delayTimeout = useRef<NodeJS.Timeout | null>(null);

	const handleMouseMove = (e: React.MouseEvent) => {
		setTooltipPos({ x: e.clientX, y: e.clientY });
	};

	const handleMouseEnter = () => {
		delayTimeout.current = setTimeout(() => {
			setShowTooltip(true);
		}, 1000);
	};

	const handleMouseLeave = () => {
		clearTimeout(delayTimeout.current!);
		setShowTooltip(false);
	};

	const handleTouchStart = () => {
		longPressTimeout.current = setTimeout(() => {
			setShowTooltip(true);
		}, 1000);
	};

	const handleTouchEnd = () => {
		clearTimeout(longPressTimeout.current!);
		setShowTooltip(false);
	};

	const handleClick = () => {
		if (dm) {
			flipAction();
		}
	};

	const getTooltip = () => {
		const text = getCardInfo(card, position, dm);

		return (
			<>
				{text.map((t, i) => (
					<div key={i}>
						<p>{t}</p>
						{i < text.length - 1 && <hr className="my-2 border-gray-300" />}
					</div>
				))}
			</>
		);
	};

	return (
		<>
			<div
				className={`relative h-[21vh] w-[15vh] perspective transition-transform duration-200 hover:scale-150 z-0 hover:z-10 ${dm ? 'cursor-pointer' : ''} `}
				onClick={handleClick}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onMouseMove={handleMouseMove}
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
			>
				<div
					className={`transition-transform duration-500 transform-style-preserve-3d ${flipped ? 'rotate-y-180' : ''}`}
				>
					<div className="absolute group inset-0 backface-hidden">
						<img
							src={cardBack.url}
							alt="Card Back"
							className="rounded-xl rounded border border-gray-500 "
						/>
					</div>
					<div className="absolute group inset-0 backface-hidden rotate-y-180">
						<img src={url} alt={aria} className="rounded-xl rounded border border-gray-500 " />
					</div>
				</div>
			</div>
			<div
				className={`fixed w-[25vh] pointer-events-none duration-300 ease-in z-50 text-xs bg-black text-white rounded border border-gray-300 px-2 py-1 rounded transition-opacity ${showTooltip ? 'opacity-100' : 'opacity-0'}`}
				style={{
					top: `${tooltipPos.y + 20}px`,
					left: `${tooltipPos.x + 20}px`,
				}}
			>
				{getTooltip()}
			</div>
		</>
	);
}
