'use client';

import { useAppContext } from '@/app/AppContext';
import CopyButton from '@/components/CopyButton';

export default function Links({ className }: { className?: string }) {
	const { gameData, isDM } = useAppContext();

	return (
		<div className={`w-full flex flex-col justify-between gap-2 ${className}`}>
			{isDM && (
				<CopyButton
					title="Copy DM link"
					copy={`${location.origin}/${gameData.dmID}`}
					tooltip={`${location.origin}/${gameData.dmID}`}
					className="flex flex-row content-between w-full py-1 px-2 transition-all duration-250 bg-slate-700 hover:bg-slate-600 hover:text-yellow-300 rounded-lg shadow"
				/>
			)}
			<CopyButton
				title="Copy Spectator link"
				copy={`${location.origin}/${gameData.spectatorID}`}
				tooltip={`${location.origin}/${gameData.spectatorID}`}
				className="flex flex-row content-between w-full py-1 px-2 transition-all duration-250 bg-slate-700 hover:bg-slate-600 hover:text-yellow-300 rounded-lg shadow"
			/>
		</div>
	);
}
