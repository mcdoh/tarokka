'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { socket } from '@/socket';

import Settings from '@/components/Settings';
import Card from '@/components/Card';
import NotFound from '@/components/NotFound';
import { cardMap, layout } from '@/constants/tarokka';

import type { GameUpdate, ClientUpdate } from '@/types';

export default function GamePage() {
	const { gameID: gameIDParam } = useParams();

	const [gameID, setGameID] = useState('');
	const [noGame, setNoGame] = useState(false);
	const [gameData, setGameData] = useState<GameUpdate>({
		dmID: '',
		spectatorID: '',
		cards: [],
		settings: {
			positionBack: false,
			positionFront: false,
			prophecy: false,
			notes: false,
			cardStyle: 'color',
		},
	});

	const { dmID, cards, settings } = gameData;
	const isDM = !!dmID;

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
				setGameData(data);
			});

			socket.on('game-update', (data: GameUpdate) => {
				console.log('>>>', data);
				setGameData(data);
			});

			socket.on('join-error', (error) => {
				console.error('Error:', error);
				setNoGame(true);
			});

			socket.on('flip-error', (error) => {
				console.error('Error:', error);
			});
		}

		return () => {
			socket.removeAllListeners();
		};
	}, [gameID]);

	const flipCard = (cardIndex: number) => {
		const flip: ClientUpdate = {
			gameID,
			cardIndex,
		};

		socket.emit('flip-card', flip);
	};

	const handleSettings = (gameData: GameUpdate) => {
		socket.emit('settings', { gameID, gameData });
	};

	// map our five Tarokka cards to their proper locations in a 3x3 grid
	// common deck cards: left, top, and right
	// high deck cards: bottom and center
	const arrangeCards = (_cell: unknown, index: number) => cards[cardMap[index]];

	return noGame ? (
		<NotFound />
	) : cards ? (
		<main className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[url('/img/table3.png')] bg-cover bg-center">
			{isDM && <Settings gameData={gameData} changeAction={handleSettings} />}
			<div className="grid grid-cols-3 grid-rows-3 gap-8 w-fit mx-auto">
				{Array.from({ length: 9 })
					.map(arrangeCards)
					.map((card, index) => (
						<div key={index} className="aspect-[2/3]}">
							{card && (
								<Card
									dm={isDM}
									card={card}
									position={layout[cardMap[index]]}
									settings={settings}
									flipAction={() => flipCard(cardMap[index])}
								/>
							)}
						</div>
					))}
			</div>
		</main>
	) : null;
}
