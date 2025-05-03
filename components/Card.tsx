'use client';

import ToolTip from '@/components/ToolTip';
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
};

export default function Card({ dm, card, position, settings, flipAction }: CardProps) {
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
		<ToolTip content={getTooltip()}>
			<div
				className={`relative h-[21vh] w-[15vh] perspective transition-transform duration-200 hover:scale-150 z-0 hover:z-10 ${dm ? 'cursor-pointer' : ''} `}
				onClick={handleClick}
			>
				<div
					className={`transition-transform duration-500 transform-style-preserve-3d ${flipped ? 'rotate-y-180' : ''}`}
				>
					<div className="absolute group inset-0 backface-hidden">
						<img
							src={getURL(cardBack as TarokkaGameCard, settings)}
							alt="Card Back"
							className="rounded-lg border border-yellow-500 hover:drop-shadow-[0_0_2px_#ffd700]"
						/>
					</div>
					<div className="absolute group inset-0 backface-hidden rotate-y-180">
						<img
							src={getURL(card, settings)}
							alt={aria}
							className="rounded-lg border border-yellow-500 hover:drop-shadow-[0_0_2px_#ffd700]"
						/>
					</div>
				</div>
			</div>
		</ToolTip>
	);
}
