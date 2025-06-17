import { useEffect } from 'react';
import { socket } from '@/socket';

import type { GameUpdate } from '@/types';

interface UseSocketProps {
	gameID: string;
	setGameData: (gameUpdate: GameUpdate) => void;
	setNoGame: (noGame: boolean) => void;
}

export default function useSocket({ gameID, setGameData, setNoGame }: UseSocketProps) {
	useEffect(() => {
		if (gameID) {
			socket.emit('join', gameID);

			socket.on('init', (data: GameUpdate) => {
				setGameData(data);
			});

			socket.on('game-update', (data: GameUpdate) => {
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
		socket.emit('flip-card', {
			gameID,
			cardIndex,
		});
	};

	const redraw = (cardIndex: number) => {
		socket.emit('redraw', {
			gameID,
			cardIndex,
		});
	};

	const select = (cardIndex: number, cardID: string) => {
		socket.emit('select', {
			gameID,
			cardIndex,
			cardID,
		});
	};

	const handleSettings = (gameData: GameUpdate) => {
		socket.emit('settings', {
			gameID,
			gameData,
		});
	};

	return {
		flipCard,
		redraw,
		select,
		handleSettings,
	};
}
