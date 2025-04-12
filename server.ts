import next from 'next';
import { createServer } from 'http';
import { Server as SocketIOServer, type Socket } from 'socket.io';

import GameStore from './lib/GameStore';
import type { ClientUpdate } from './types';

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

		socket.on('join', (gameID) => {
			socket.join(gameID);
			const gameUpdate = gameStore.joinGame(gameID, socket.id);

			console.log(`Socket ${socket.id} joined game ${gameID}`);

			socket.emit('init', gameUpdate);
		});

		socket.on('flip-card', ({ gameID, cardIndex }: ClientUpdate) => {
			console.log('Card flipped:', { gameID, cardIndex });

			const gameUpdate = gameStore.flipCard(gameID, cardIndex);

			io.to(gameID).emit('card-flipped', gameUpdate);
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
