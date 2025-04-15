import next from 'next';
import { createServer } from 'http';
import { Server as SocketIOServer, type Socket } from 'socket.io';

import GameStore from '@/lib/GameStore';
import type { ClientUpdate } from '@/types';

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const gameStore = new GameStore();

app.prepare().then(() => {
	const httpServer = createServer(handler);

	const io = new SocketIOServer(httpServer);

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
					const { spectatorID, cards } = gameUpdate;
					socket.emit('init', { spectatorID, cards });
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

				io.to(gameID).emit('card-flipped', gameUpdate);
			} catch (e) {
				const error = e instanceof Error ? e.message : e;

				console.error('Error', error);
				socket.emit('flip-error', error);
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
