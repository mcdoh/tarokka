'use client';

import { useState } from 'react';
import { Settings as Gear, X } from 'lucide-react';

import CopyButton from '@/components/CopyButton';
import Switch from '@/components/Switch';
import { CardStyle, GameUpdate } from '@/types';

type PermissionTogglePanelProps = {
	gameData: GameUpdate;
	changeAction: (updatedSettings: GameUpdate) => void;
};

const cardStyleOptions: CardStyle[] = ['standard', 'color', 'grayscale'];

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

	const tuneRadio = (cardStyle: CardStyle) => {
		changeAction({
			...gameData,
			settings: {
				...gameData.settings,
				cardStyle,
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
					{Object.entries(gameData.settings)
						.filter(([_key, value]) => typeof value === 'boolean')
						.map(([key, value]) => (
							<Switch label={key} value={value} toggleAction={() => togglePermission(key)} />
						))}
					<fieldset className="flex flex-col">
						<div className="text-xs text-gray-400 mb-1">Card style:</div>
						<div className="inline-flex overflow-hidden rounded-md w-full">
							{cardStyleOptions.map((option, index) => (
								<label
									key={option}
									className={`cursor-pointer px-4 py-2 text-sm font-medium transition
                    ${gameData.settings.cardStyle === option ? 'bg-gray-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}
                    ${index === 0 ? 'rounded-l-md' : ''}
                    ${index === cardStyleOptions.length - 1 ? 'rounded-r-md' : ''}
                    ${index !== 0 && 'border-l border-gray-600'}
                    border border-gray-600
                  `}
								>
									<input
										type="radio"
										name="cardStyle"
										value={option}
										checked={gameData.settings.cardStyle === option}
										onChange={() => tuneRadio(option)}
										className="sr-only"
									/>
									{option}
								</label>
							))}
						</div>
					</fieldset>
				</div>
			)}
		</div>
	);
}
