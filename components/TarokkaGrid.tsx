'use client';

import { useAppContext } from '@/app/AppContext';
import Card from '@/components/Card';
import { cardMap } from '@/constants/tarokka';
import type {} from '@/types';

export default function TarokkaGrid() {
	const { gameData } = useAppContext();
	const { cards } = gameData;

	// map our five Tarokka cards to their proper locations in a 3x3 grid
	// common deck cards: left, top, and right
	// high deck cards: bottom and center
	const arrangeCards = (_cell: unknown, index: number) => cards[cardMap[index]];

	return (
		<div className="grid grid-cols-3 grid-rows-3 gap-8 w-fit mx-auto">
			{Array.from({ length: 9 })
				.map(arrangeCards)
				.map((card, index) => (
					<div key={index} className="aspect-[2/3]}">
						{card && <Card card={card} cardIndex={cardMap[index]} />}
					</div>
				))}
		</div>
	);
}
