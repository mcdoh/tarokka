'use client';

import { useAppContext } from '@/app/AppContext';
import type { CardStyle } from '@/types';

const cardStyleOptions: CardStyle[] = ['standard', 'color', 'grayscale'];

export default function CardStyle({ className }: { className?: string }) {
	const { gameData, isDM, settings, emitSettings } = useAppContext();

	const tuneRadio = (cardStyle: CardStyle) => {
		emitSettings({
			...gameData,
			settings: {
				...gameData.settings,
				cardStyle,
			},
		});
	};

	return isDM ? (
		<fieldset className={`flex flex-col w-full ${className}`}>
			<div className="text-xs ml-1 mb-1">Card style:</div>
			<div className="inline-flex overflow-hidden rounded-md w-full">
				{cardStyleOptions.map((option, index) => (
					<label
						key={option}
						className={`
							flex justify-center
							cursor-pointer
							w-full px-3 py-2
							text-xs font-medium capitalize
							border border-yellow-500
							transition hover:text-yellow-300 hover:drop-shadow-[0_0_3px_#ffd700]
							${settings.cardStyle === option ? 'bg-slate-700 text-yellow-300 font-extrabold' : 'bg-slate-800 hover:bg-slate-700'}
							${index === 0 ? 'rounded-l-md' : ''}
							${index === cardStyleOptions.length - 1 ? 'rounded-r-md' : ''}
							${index !== 0 && 'border-l border-gray-600'}
						`}
					>
						<input
							type="radio"
							name="cardStyle"
							value={option}
							checked={settings.cardStyle === option}
							onChange={() => tuneRadio(option)}
							className="sr-only"
						/>
						{option}
					</label>
				))}
			</div>
		</fieldset>
	) : null;
}
