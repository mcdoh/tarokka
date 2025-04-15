'use client';
import { useRef, useState } from 'react';

import ToolTip from '@/components/ToolTip';
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
		<ToolTip content={getTooltip()}>
			<div
				className={`relative h-[21vh] w-[15vh] perspective transition-transform duration-200 hover:scale-150 z-0 hover:z-10 ${dm ? 'cursor-pointer' : ''} `}
				onClick={handleClick}
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
		</ToolTip>
	);
}
