'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { socket } from '@/socket';

import Card from '@/components/Card';

import type { GameUpdate, ClientUpdate, StandardGameCard, TarokkaGameCard } from '@/types';

// map our five cards to their appropriate
// locations in a 3x3 grid
// █1█
// 042
// █3█
const cardMap = {
	3: 0,
	1: 1,
	5: 2,
	7: 3,
	4: 4,
};

export default function GamePage() {
	const { gameID: gameIDParam } = useParams();

	const [gameID, setGameID] = useState('');
	const [cards, setCards] = useState<StandardGameCard[] | TarokkaGameCard[]>([]);

	useEffect(() => {
		if (gameIDParam) {
			setGameID(Array.isArray(gameIDParam) ? gameIDParam[0] : gameIDParam);
		}
	}, [gameIDParam]);

	useEffect(() => {
		if (gameID) {
			socket.emit('join', gameID);

			socket.on('init', (data: GameUpdate) => {
				console.log('init', data);
				setCards(data.cards);
			});

			socket.on('card-flipped', (data: GameUpdate) => {
				console.log('>>>', data);
				setCards(data.cards);
			});
		}

		return gameID
			? () => {
					socket.off('init');
					socket.off('card-flipped');
				}
			: undefined;
	}, [gameID]);

	const flipCard = (cardIndex: number) => {
		const flip: ClientUpdate = {
			gameID,
			cardIndex,
		};

		socket.emit('flip-card', flip);
	};

	// map our five Tarokka cards to their proper locations in a 3x3 grid
	// common deck cards: left, top, and right
	// high deck cards: bottom and center
	const arrangeCards = (_cell: any, index: number) => cards[cardMap[index]];

	return cards.length ? (
		<main className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[url('/img/table3.png')] bg-cover bg-center">
			<div className="grid grid-cols-3 grid-rows-3 gap-8 w-fit mx-auto">
				{Array.from({ length: 9 })
					.map(arrangeCards)
					.map((card, index) => (
						<div key={index} className="aspect-[2/3]}">
							{card && <Card card={card} flipAction={() => flipCard(cardMap[index])} />}
						</div>
					))}
			</div>
		</main>
	) : null;
}
