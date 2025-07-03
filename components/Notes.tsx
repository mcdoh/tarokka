'use client';

import { useMemo, useState } from 'react';
import { CircleX, ScrollText } from 'lucide-react';

import { useAppContext } from '@/app/AppContext';
import CopyButton from '@/components/CopyButton';
import Scrim from '@/components/Scrim';
import getCardInfo from '@/tools/getCardInfo';
import { cardMap, layout } from '@/constants/tarokka';

export default function Notes() {
	const { gameData } = useAppContext();
	const { dmID, cards, settings } = gameData;

	const isDM = !!dmID;
	const show = cards.every(({ flipped }) => flipped);

	const [open, setOpen] = useState(false);

	const notes: (string[] | undefined)[] = useMemo(
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
		[cards, isDM, settings],
	);

	const showNotes = show && open && (isDM || settings.notes);

	return (
		<div
			className={`fixed bottom-4 right-4 z-25 transition-all duration-250 ${show ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
		>
			<button
				className={`text-yellow-400 hover:text-yellow-300 hover:drop-shadow-[0_0_3px_#ffd700] p-2 transition-all duration-250 cursor-pointer ${showNotes ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'}`}
				onClick={() => setOpen((prev) => !prev)}
			>
				<ScrollText className="w-5 h-5" />
			</button>

			<Scrim
				clickAction={() => setOpen((prev) => !prev)}
				className={`transition-all duration-250 ${showNotes ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
			>
				<div
					className={`
						fixed bottom-4 right-4
						transition-all duration-250
						bg-slate-800
						border border-yellow-400 rounded-lg
						${showNotes ? 'sm:w-[50vw] sm:h-[67vh] w-[80vw] h-[80vh]' : 'w-0 h-0'}
					`}
				>
					<CopyButton
						copy={notes.map((note) => note!.join('\n')).join('\n\n')}
						className={`
							absolute top-2 right-2
							cursor-pointer p-2
							transition-all duration-250
							text-yellow-400 hover:text-yellow-300 hover:drop-shadow-[0_0_3px_#ffd700]
						`}
					/>
					<div className="text-yellow-400 h-full overflow-scroll p-8 transition-all delay-200 duration-50 ${showNotes ? 'opacity-100' : 'opacity-0'}">
						{notes.map((note, index) => (
							<div key={index}>
								<div className="flex flex-col gap-2">
									{note!.map((blurb, index) => (
										<p key={index}>{blurb}</p>
									))}
								</div>
								{index < notes.length - 1 && <hr className="my-3 border-yellow-400" />}
							</div>
						))}
					</div>
				</div>
				<button
					className={`
						fixed bottom-4 right-4
						cursor-pointer p-2
						transition-all duration-250
						text-yellow-400 hover:text-yellow-300 hover:drop-shadow-[0_0_3px_#ffd700]
					`}
					onClick={() => setOpen((prev) => !prev)}
				>
					<CircleX className="w-5 h-5" />
				</button>
			</Scrim>
		</div>
	);
}
