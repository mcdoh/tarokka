import next from 'next';
import { createServer } from 'http';
import { Server as SocketIOServer, type Socket } from 'socket.io';

//import GameStore from '@/lib/GameStore';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

// when using middleware `hostname` and `port` must be provided
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

//const gameStore = new GameStore();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new SocketIOServer(httpServer);

  io.on('connection', (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('join', (gameID) => {
      socket.join(gameID);
      //const game = gameStore.joinGame(gameID, socket.id);

      console.log(`Socket ${socket.id} joined game ${gameID}`)

      //socket.emit('init', { cards: game.cards });
      socket.emit('init', { id: socket.id });
    })

    socket.on('flip-card', ({ gameID, cardID }) => {
      console.log('Card flipped:', { gameID, cardID });
      //const game = gameStore.flipCard(gameID, cardID);
      //io.to(gameID).emit('card-flipped', { gameID, cards: game.cards });
      io.to(gameID).emit('card-flipped', { id: socket.id });
    });

    socket.on('disconnect', (obj) => {
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
