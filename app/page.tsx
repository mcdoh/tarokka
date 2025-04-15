'use client';
import { socket } from '@/socket';
import { useRouter } from 'next/navigation';

import { GameUpdate } from '@/types';

export default function Home() {
	const router = useRouter();

	const handleCreateGame = () => {
		socket.emit('start');

		socket.on('new-game', (game: GameUpdate) => {
			router.push(`/${game.dmID}`);
		});
	};

	return (
		<main className="min-h-screen flex items-center justify-center bg-[url('/img/table3.png')] bg-cover bg-center">
			<button
				onClick={handleCreateGame}
				className="bg-blue-600 text-white text-lg px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
			>
				Create New Game
			</button>
		</main>
	);
}
