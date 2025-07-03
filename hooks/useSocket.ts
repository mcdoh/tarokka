import { useEffect, useState } from 'react';
import { socket } from '@/socket';
import type { GameUpdate, Tilt } from '@/types';

interface UseSocketProps {
	gameID: string;
	setGameData: (gameUpdate: GameUpdate) => void;
	setNoGame: (noGame: boolean) => void;
}

export default function useSocket({ gameID, setGameData, setNoGame }: UseSocketProps) {
	const [connect, setConnect] = useState(1);
	const [disconnected, setDisconnected] = useState(true);

	useEffect(() => {
		if (gameID) {
			socket.emit('join', gameID);

			socket.on('init', (data: GameUpdate) => {
				setDisconnected(false);
				setGameData(data);
			});

			socket.on('game-update', (data: GameUpdate) => {
				// remove user's own tilts in favor of local values
				data.tilts = data.tilts.map((card) => card.filter((tilt) => tilt.playerID !== socket.id));
				setGameData(data);
			});

			socket.on('join-error', (error) => {
				console.error('Error:', error);
				setNoGame(true);
			});

			socket.on('flip-error', (error) => {
				console.error('Error:', error);
			});

			socket.on('disconnect', () => {
				setDisconnected(true);
			});
		}

		return () => {
			socket.removeAllListeners();
		};
	}, [gameID, connect]);

	const emitFlip = (cardIndex: number) => {
		if (disconnected) setConnect(connect + 1);

		socket.emit('flip-card', {
			gameID,
			cardIndex,
		});
	};

	const emitSettings = (gameData: GameUpdate) => {
		if (disconnected) setConnect(connect + 1);

		socket.emit('settings', {
			gameID,
			gameData,
		});
	};

	const emitRedraw = (cardIndex: number) => {
		if (disconnected) setConnect(connect + 1);

		socket.emit('redraw', {
			gameID,
			cardIndex,
		});
	};

	const emitSelect = (cardIndex: number, cardID: string) => {
		if (disconnected) setConnect(connect + 1);

		socket.emit('select', {
			gameID,
			cardIndex,
			cardID,
		});
	};

	const emitTilt = (cardIndex: number, tilt: Tilt) => {
		if (disconnected) setConnect(connect + 1);

		socket.emit('tilt', {
			cardIndex,
			tilt,
		});
	};

	return {
		emitFlip,
		emitSettings,
		emitRedraw,
		emitSelect,
		emitTilt,
	};
}
