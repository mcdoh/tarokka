'use client';

import { useState } from 'react';
import { Settings as Gear } from 'lucide-react';
import { Cinzel_Decorative } from 'next/font/google';

import CopyButton from '@/components/CopyButton';
import Scrim from '@/components/Scrim';
import Switch from '@/components/Switch';
import { CardStyle, GameUpdate } from '@/types';

const cinzel = Cinzel_Decorative({
	variable: '--font-cinzel',
	subsets: ['latin'],
	weight: '400',
});

type SettingsProps = {
	gameData: GameUpdate;
	changeAction: (updatedSettings: GameUpdate) => void;
};

const cardStyleOptions: CardStyle[] = ['standard', 'color', 'grayscale'];

export default function Settings({ gameData, changeAction }: SettingsProps) {
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

	const Links = () => (
		<>
			<CopyButton
				title="Copy DM link"
				copy={`${location.origin}/${gameData.dmID}`}
				tooltip={`${location.origin}/${gameData.dmID}`}
				className="flex flex-row content-between w-full py-1 px-2 transition-all duration-250 bg-slate-700 hover:bg-slate-600 hover:text-yellow-300 rounded-lg shadow"
			/>
			<CopyButton
				title="Copy Spectator link"
				copy={`${location.origin}/${gameData.spectatorID}`}
				tooltip={`${location.origin}/${gameData.spectatorID}`}
				className="flex flex-row content-between w-full py-1 px-2 transition-all duration-250 bg-slate-700 hover:bg-slate-600 hover:text-yellow-300 rounded-lg shadow"
			/>
		</>
	);

	const Permissions = () => (
		<>
			{Object.entries(gameData.settings)
				.filter(([_key, value]) => typeof value === 'boolean')
				.map(([key, value]) => (
					<Switch key={key} label={key} value={value} toggleAction={() => togglePermission(key)} />
				))}
		</>
	);

	const CardStyle = () => (
		<fieldset className="flex flex-col">
			<div className="text-xs mb-1">Card style:</div>
			<div className="inline-flex overflow-hidden rounded-md w-full">
				{cardStyleOptions.map((option, index) => (
					<label
						key={option}
						className={`cursor-pointer px-4 py-2 text-sm font-medium transition
                    ${gameData.settings.cardStyle === option ? 'bg-slate-700 text-yellow-300 font-extrabold' : 'bg-slate-800 hover:bg-slate-700'}
                    ${index === 0 ? 'rounded-l-md' : ''}
                    ${index === cardStyleOptions.length - 1 ? 'rounded-r-md' : ''}
                    ${index !== 0 && 'border-l border-gray-600'}
                    border border-yellow-500 hover:text-yellow-300
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
	);

	return (
		<div className={`fixed top-4 right-4 z-25 ${cinzel.className}`}>
			<Scrim
				onClick={() => setOpen((prev) => !prev)}
				className={`transition-all duration-250 ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
			>
				<div
					className={`fixed top-4 right-4 flex flex-col items-center justify-center bg-slate-800 text-yellow-400 rounded-lg border border-yellow-400 p-6 space-y-2 transition-all duration-250 ${open ? 'opacity-100 w-[350px] h-[300px]' : 'opacity-0 w-0 h-0'}`}
				>
					<Links />
					<Permissions />
					<CardStyle />
				</div>
			</Scrim>
			<button
				className={`p-2 transition-all duration-250 text-yellow-400 hover:text-yellow-300 cursor-pointer ${open ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'}`}
				onClick={() => setOpen((prev) => !prev)}
			>
				<Gear className="w-5 h-5" />
			</button>
		</div>
	);
}
