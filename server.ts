import next from 'next';
import { createServer } from 'http';
import { Server as SocketIOServer, type Socket } from 'socket.io';

import GameStore from '@/lib/GameStore';
import omit from '@/tools/omit';
import type { ClientUpdate, GameUpdate, Settings } from '@/types';

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const gameStore = new GameStore();

app.prepare().then(() => {
	const httpServer = createServer(handler);

	const io = new SocketIOServer(httpServer);

	const broadcast = (event: string, gameUpdate: GameUpdate) => {
		io.to(gameUpdate.dmID).emit(event, gameUpdate);
		io.to(gameUpdate.spectatorID).emit(event, omit(gameUpdate, 'dmID'));
	};

	io.on('connection', (socket: Socket) => {
		console.log(`Client connected: ${socket.id}`);

		socket.on('start', () => {
			const gameUpdate = gameStore.createGame();

			console.log(`Socket ${socket.id} started game ${gameUpdate.dmID}`);

			socket.emit('new-game', gameUpdate);
		});

		socket.on('join', (gameID) => {
			try {
				const gameUpdate = gameStore.joinGame(gameID, socket.id);

				console.log(`Socket ${socket.id} joined game ${gameID}`);

				socket.join(gameID);

				if (gameID === gameUpdate.spectatorID) {
					socket.emit('init', omit(gameUpdate, 'dmID'));
				} else {
					socket.emit('init', gameUpdate);
				}
			} catch (e) {
				const error = e instanceof Error ? e.message : e;

				console.error('Error', error);
				socket.emit('join-error', error);
			}
		});

		socket.on('flip-card', ({ gameID, cardIndex }: ClientUpdate) => {
			try {
				console.log('Card flipped:', { gameID, cardIndex });

				const gameUpdate = gameStore.flipCard(gameID, cardIndex);

				broadcast('game-update', gameUpdate);
			} catch (e) {
				const error = e instanceof Error ? e.message : e;

				console.error('Error', error);
				socket.emit('flip-error', error);
			}
		});

		socket.on('settings', ({ gameID, gameData }: { gameID: string; gameData: GameUpdate }) => {
			try {
				const gameUpdate = gameStore.updateSettings(gameID, gameData.settings);
				broadcast('game-update', gameUpdate);
			} catch (e) {
				const error = e instanceof Error ? e.message : e;
				console.error('Error', error);
			}
		});

		socket.on('disconnect', () => {
			console.log(`Client disconnected: ${socket.id}`);
		});
	});

	httpServer
		.once('error', (err) => {
			console.error('Server error:', err);
			process.exit(1);
		})
		.listen(port, () => {
			console.log(`> Ready on http://${hostname}:${port}`);
		});
});
