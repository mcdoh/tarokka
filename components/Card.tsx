'use client';

import { useState } from 'react';
import ToolTip from '@/components/ToolTip';
import StackTheDeck from '@/components/StackTheDeck';
import tarokkaCards from '@/constants/tarokkaCards';
import getCardInfo from '@/tools/getCardInfo';
import getURL from '@/tools/getURL';

import { Layout, Settings, TarokkaGameCard } from '@/types';

const cardBack = tarokkaCards.find((card) => card.back)!;

type CardProps = {
	dm: boolean;
	card: TarokkaGameCard;
	position: Layout;
	settings: Settings;
	flipAction: () => void;
	redrawAction: () => void;
	selectAction: () => void;
};

export default function Card({
	dm,
	card,
	position,
	settings,
	flipAction,
	redrawAction,
	selectAction,
}: CardProps) {
	const [tooltip, setTooltip] = useState<React.ReactNode>(null);

	const { aria, flipped } = card;

	const handleClick = () => {
		if (dm) {
			flipAction();
		}
	};

	const getTooltip = () => {
		const text = getCardInfo(card, position, dm, settings);

		return text.length ? (
			<>
				{text.map((t, i) => (
					<div key={i}>
						<p className="text-yellow-400">{t}</p>
						{i < text.length - 1 && <hr className="my-2 border-yellow-400" />}
					</div>
				))}
			</>
		) : null;
	};

	return (
		<ToolTip content={tooltip || getTooltip()}>
			<div
				className={`relative h-[21vh] w-[15vh] perspective transition-transform duration-200 hover:scale-150 z-0 hover:z-10 ${dm ? 'cursor-pointer' : ''} `}
				onClick={handleClick}
			>
				<div
					className={`absolute inset-0 transition-transform duration-500 transform-style-preserve-3d ${flipped ? 'rotate-y-180' : ''}`}
				>
					<div className="absolute inset-0 group backface-hidden">
						{dm && (
							<>
								<img src={getURL(card, settings)} alt={aria} className="absolute rounded-lg" />
								<img
									src={getURL(cardBack as TarokkaGameCard, settings)}
									alt=""
									className={`absolute rounded-lg see-through`}
								/>
							</>
						)}
						<img
							src={getURL(cardBack as TarokkaGameCard, settings)}
							alt="Card Back"
							className={`absolute rounded-lg ${dm ? 'transition duration-500 group-hover:opacity-0' : ''} ${settings.cardStyle === 'grayscale' ? 'border border-yellow-500/25 group-hover:drop-shadow-[0_0_3px_#ffd700/50]' : ''}`}
						/>
						{dm && !flipped && (
							<StackTheDeck
								onRedraw={redrawAction}
								onSelect={() => selectAction()}
								onHover={setTooltip}
							/>
						)}
					</div>
					<div className="absolute inset-0 backface-hidden rotate-y-180">
						<img
							src={getURL(card, settings)}
							alt={aria}
							className="rounded-lg border border-yellow-500/25 hover:drop-shadow-[0_0_3px_#ffd700/50]"
						/>
					</div>
				</div>
			</div>
		</ToolTip>
	);
}
