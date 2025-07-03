'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

import { useAppContext } from '@/app/AppContext';
import CardSelect from '@/components/CardSelect';
import Notes from '@/components/Notes';
import NotFound from '@/components/NotFound';
import Settings from '@/components/Settings/index';
import { SpectatorLink } from '@/components/SpectatorLink';
import TarokkaGrid from '@/components/TarokkaGrid';

export default function GamePage() {
	const { noGame, setGameID } = useAppContext();
	const { gameID } = useParams();

	useEffect(() => {
		if (gameID) {
			setGameID(Array.isArray(gameID) ? gameID[0] : gameID);
		}
	}, [gameID]);

	return noGame ? (
		<NotFound />
	) : (
		<main className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[url('/img/table3.png')] bg-cover bg-center">
			<SpectatorLink />
			<Settings />
			<TarokkaGrid />
			<Notes />
			<CardSelect />
		</main>
	);
}
