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
				className="bg-slate-800 hover:bg-slate-700 text-yellow-400 border border-yellow-500/25 hover:drop-shadow-[0_0_3px_rgba(255,215,0,0.5)] hover:text-yellow-300 text-lg px-6 py-3 rounded-lg shadow transition-all duration-250 cursor-pointer"
			>
				Create New Game
			</button>
		</main>
	);
}
