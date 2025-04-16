'use client';

import { useState } from 'react';
import { Settings as Gear, X } from 'lucide-react';

import CopyButton from '@/components/CopyButton';
import Switch from '@/components/Switch';
import { GameUpdate } from '@/types';

type PermissionTogglePanelProps = {
	gameData: GameUpdate;
	changeAction: (updatedSettings: GameUpdate) => void;
};

export default function PermissionTogglePanel({
	gameData,
	changeAction,
}: PermissionTogglePanelProps) {
	const [open, setOpen] = useState(false);

	const togglePermission = (key: string) => {
		changeAction({
			...gameData,
			settings: {
				...gameData.settings,
				[key]: !gameData.settings[key],
			},
		});
	};

	return (
		<div className="fixed top-4 right-4 z-50">
			{!open && (
				<button
					className="p-2 text-gray-100 hover:text-gray-300 cursor-pointer"
					onClick={() => setOpen((prev) => !prev)}
				>
					<Gear className="w-5 h-5" />
				</button>
			)}

			{open && (
				<div className="relative text-gray-100 bg-gray-800 shadow-lg rounded-lg border border-gray-500 p-6 space-y-2">
					<button
						className="absolute top-1 right-1 p-1 hover:text-gray-300 cursor-pointer"
						onClick={() => setOpen((prev) => !prev)}
					>
						<X className="w-4 h-4" />
					</button>
					<CopyButton title="DM link" copy={`${location.origin}/${gameData.dmID}`} />
					<CopyButton title="Spectator link" copy={`${location.origin}/${gameData.spectatorID}`} />
					{Object.entries(gameData.settings).map(([key, value]) => (
						<Switch label={key} value={value} toggleAction={() => togglePermission(key)} />
					))}
				</div>
			)}
		</div>
	);
}
