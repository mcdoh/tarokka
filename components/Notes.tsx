'use client';

import { useMemo, useState } from 'react';
import { ScrollText } from 'lucide-react';

import CopyButton from '@/components/CopyButton';
import Scrim from '@/components/Scrim';
import getCardInfo from '@/tools/getCardInfo';
import { cardMap, layout } from '@/constants/tarokka';

import { GameUpdate } from '@/types';

type NotesProps = {
	gameData: GameUpdate;
};

export default function Notes({ gameData: { dmID, cards, settings } }: NotesProps) {
	const isDM = !!dmID;

	const [open, setOpen] = useState(false);

	const gameDummy = {
		dmID: '',
		spectatorID: '',
		cards: [],
		settings: {
			positionBack: false,
			positionFront: false,
			prophecy: false,
			notes: false,
			cardStyle: 'color',
		},
	};

	const notes = useMemo(
		() =>
			Array.from({ length: 9 })
				.map((_cell: unknown, index: number) => cards[cardMap[index]])
				.map((card, index) =>
					card ? getCardInfo(card, layout[cardMap[index]], isDM, settings) : null,
				)
				.map(
					(_cell: unknown, index: number, cards) =>
						cards[Object.keys(cardMap).find((key) => cardMap[key] === index) || 0],
				)
				.filter((truthy) => truthy),
		[settings],
	);

	return isDM || settings.notes ? (
		<div className="fixed bottom-4 right-4 z-50">
			{!open && (
				<button
					className="p-2 text-gray-100 hover:text-gray-300 cursor-pointer"
					onClick={() => setOpen((prev) => !prev)}
				>
					<ScrollText className="w-5 h-5" />
				</button>
			)}

			{open && (
				<Scrim onClick={() => setOpen((prev) => !prev)}>
					<div className="fixed bottom-4 right-4 w-[33vw] h-[67vh] text-gray-100 bg-gray-800 shadow-lg rounded-lg border border-gray-500 space-y-2">
						<CopyButton
							copy={notes.map((note) => note!.join('\n')).join('\n\n')}
							className="absolute top-2 right-2 p-2 bg-black/30 hover:bg-black/50 rounded-full text-gray-200 hover:text-white"
						/>
						<div className="h-full overflow-scroll p-6">
							{notes.map((note, index) => (
								<div key={index}>
									<div className="flex flex-col gap-2">
										{note!.map((blurb, index) => (
											<p key={index}>{blurb}</p>
										))}
									</div>
									{index < notes.length - 1 && <hr className="my-3 border-gray-300" />}
								</div>
							))}
						</div>
					</div>
				</Scrim>
			)}
		</div>
	) : null;
}
