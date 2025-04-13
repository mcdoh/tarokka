'use client';

import { StandardGameCard, TarokkaGameCard } from '@/types';
import tarokkaCards from '@/constants/tarokkaCards';

const cardBack = tarokkaCards.find((card) => card.back)!;

type CardProps = {
	card: StandardGameCard | TarokkaGameCard;
	flipAction: () => void;
};

export default function Card({ card: { aria, flipped, url }, flipAction }: CardProps) {
	return (
		<div
			className="relative h-[21vh] w-[15vh] cursor-pointer perspective transition-transform duration-200 hover:scale-150 z-0 hover:z-10"
			onClick={flipAction}
		>
			<div
				className={`transition-transform duration-500 transform-style-preserve-3d ${flipped ? 'rotate-y-180' : ''}`}
			>
				<div className="absolute inset-0 backface-hidden">
					<img src={cardBack.url} alt="Card Back" className="rounded-xl" />
				</div>
				<div className="absolute inset-0 backface-hidden rotate-y-180">
					<img src={url} alt={aria} className="rounded-xl" />
				</div>
			</div>
		</div>
	);
}
