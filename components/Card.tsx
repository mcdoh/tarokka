'use client';

import { useState } from 'react';
import { useAppContext } from '@/app/AppContext';
import TiltCard from '@/components/TiltCard';
import ToolTip from '@/components/ToolTip';
import StackTheDeck from '@/components/StackTheDeck';
import Sheen from '@/components/Sheen';
import { getCardInfo, getURL } from '@/tools';

import tarokkaCards from '@/constants/tarokkaCards';
import { layout } from '@/constants/tarokka';

import { TarokkaGameCard } from '@/types';

const cardBack = tarokkaCards.find((card) => card.back)!;

type CardProps = {
	card: TarokkaGameCard;
	cardIndex: number;
};

export default function Card({ card, cardIndex }: CardProps) {
	const [tooltip, setTooltip] = useState<React.ReactNode>(null);
	const { emitFlip, gameData, emitRedraw, setSelectCardIndex } = useAppContext();

	const { dmID, settings } = gameData;
	const isDM = !!dmID;

	const { aria, flipped } = card;
	const position = layout[cardIndex];

	const handleClick = () => {
		if (isDM) {
			emitFlip(cardIndex);
		}
	};

	const getTooltip = () => {
		const text = getCardInfo(card, position, isDM, settings);

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
			<TiltCard
				className={`h-[21vh] w-[15vh] max-w-[30vw] relative perspective transition-transform duration-200 z-0 hover:z-10 hover:scale-150 ${isDM ? 'cursor-pointer' : ''} `}
				cardIndex={cardIndex}
			>
				<div
					className={`absolute inset-0 transition-transform duration-500 transform-style-preserve-3d ${flipped ? 'rotate-y-180' : ''}`}
					onClick={handleClick}
				>
					<div className="absolute inset-0 group backface-hidden">
						{isDM && (
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
							className={`absolute rounded-lg ${isDM ? 'transition duration-500 group-hover:opacity-0' : ''} ${settings.cardStyle === 'grayscale' ? 'border border-yellow-500/25 group-hover:drop-shadow-[0_0_3px_#ffd700/50]' : ''}`}
						/>
						{isDM && !flipped && (
							<StackTheDeck
								onRedraw={() => emitRedraw(cardIndex)}
								onSelect={() => setSelectCardIndex(cardIndex)}
								onHover={setTooltip}
							/>
						)}
						<Sheen cardIndex={cardIndex} />
					</div>
					<div className="absolute inset-0 backface-hidden rotate-y-180">
						<img
							src={getURL(card, settings)}
							alt={aria}
							className="rounded-lg border border-yellow-500/25 hover:drop-shadow-[0_0_3px_#ffd700/50]"
						/>
						<Sheen cardIndex={cardIndex} />
					</div>
				</div>
			</TiltCard>
		</ToolTip>
	);
}
