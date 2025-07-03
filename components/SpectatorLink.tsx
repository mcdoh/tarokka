'use client';

import { Eye } from 'lucide-react';
import { useAppContext } from '@/app/AppContext';
import CopyButton from '@/components/CopyButton';

export function SpectatorLink() {
	const { gameData } = useAppContext();

	return (
		<CopyButton
			copy={`${location.origin}/${gameData.spectatorID}`}
			tooltip={`Spectator link: ${location.origin}/${gameData.spectatorID}`}
			Icon={Eye}
			className={`fixed top-3 left-3 p-2 z-25 transition-all duration-250 text-yellow-400 hover:text-yellow-300 hover:drop-shadow-[0_0_3px_#ffd700] cursor-pointer`}
			size={24}
		/>
	);
}
