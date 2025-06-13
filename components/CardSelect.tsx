'use client';

import { CircleX } from 'lucide-react';
import TarokkaDeck from '@/lib/TarokkaDeck';
import getURL from '@/tools/getURL';

import { Deck, Settings, TarokkaGameCard } from '@/types';

const tarokkaDeck = new TarokkaDeck();

type CardSelectProps = {
	closeAction: () => void;
	selectAction: (cardID: string) => void;
	hand: TarokkaGameCard[];
	settings: Settings;
	show: Deck | null;
	className?: string;
};

export default function CardSelect({
	closeAction,
	selectAction,
	hand,
	settings,
	show,
	className = '',
}: CardSelectProps) {
	const handIDs = hand.map(({ id }) => id);

	const handleClose = (event: React.MouseEvent<HTMLElement>) => {
		if (event.target === event.currentTarget) {
			closeAction();
		}
	};

	if (!show) return null;

	const cards = show === 'high' ? tarokkaDeck.getHigh() : tarokkaDeck.getLow();

	return (
		<div
			onClick={handleClose}
			className={`fixed inset-0 flex justify-center items-center p-4 bg-black/20 backdrop-blur-sm z-40 ${className}`}
		>
			<button
				className={`fixed top-4 right-4 p-2 transition-all duration-250 text-yellow-400 hover:text-yellow-300 hover:drop-shadow-[0_0_3px_#ffd700] cursor-pointer`}
				onClick={closeAction}
			>
				<CircleX className="w-6 h-6" />
			</button>
			<div
				onClick={handleClose}
				className={`flex flex-wrap justify-center items-center gap-3 h-dvh w-2/3 overflow-scroll scrollbar-hide p-4`}
			>
				{cards
					.filter(({ id }) => !handIDs.includes(id))
					.map((card) => (
						<div
							key={card.id}
							className={`relative h-[21vh] w-[15vh] perspective transition-transform duration-200 hover:scale-150 z-0 hover:z-10`}
							onClick={() => selectAction(card.id)}
						>
							<img
								src={getURL(card, settings)}
								alt={card.aria}
								className="rounded-lg border border-yellow-500/25 hover:drop-shadow-[0_0_3px_#ffd700/50]"
							/>
						</div>
					))}
			</div>
		</div>
	);
}
