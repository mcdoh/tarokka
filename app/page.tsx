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
		<main className="min-h-screen flex justify-center items-center text-yellow-400 bg-[url('/img/table3.png')] bg-cover bg-center">
			<div className="flex flex-col items-center gap-8 text-center">
				<h1 className="text-5xl font-bold text-center text-primary">Tarokka</h1>
				<p className="text-l text-center w-[350px] m-auto">
					Online Tarokka readings for <em>Dungeons & Dragons: Curse of Strahd</em>.
				</p>
				<button
					onClick={handleCreateGame}
					className="bg-slate-800 hover:bg-slate-700 border border-yellow-500/25 hover:drop-shadow-[0_0_3px_rgba(255,215,0,0.5)] hover:text-yellow-300 text-lg px-6 py-3 rounded-lg shadow transition-all duration-250 cursor-pointer"
				>
					Create New Game
				</button>
			</div>
		</main>
	);
}
