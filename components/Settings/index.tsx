'use client';

import { useState } from 'react';
import { CircleX, Settings as Gear } from 'lucide-react';
import { Cinzel_Decorative } from 'next/font/google';

import { useAppContext } from '@/app/AppContext';
import Scrim from '@/components/Scrim';

import CardStyle from './CardStyle';
import ExternalLinks from './ExternalLinks';
import GameLinks from './GameLinks';
import Permissions from './Permissions';

const cinzel = Cinzel_Decorative({
	variable: '--font-cinzel',
	subsets: ['latin'],
	weight: '400',
});

export default function Settings() {
	const [open, setOpen] = useState(false);
	const { isDM } = useAppContext();

	return (
		<div className={`fixed top-4 right-4 z-25 ${cinzel.className}`}>
			<Scrim
				clickAction={() => setOpen((prev) => !prev)}
				className={`transition-all duration-250 ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
			>
				<div
					className={`
						fixed top-4 right-4
						flex flex-col items-center justify-between
						bg-slate-800 text-yellow-400
						rounded-lg border border-yellow-400
						h-full p-8
						transition-all duration-250
						${open ? `opacity-100 ${isDM ? 'w-[350px] max-h-[425px]' : 'w-[325px] max-h-[200px]'}` : 'opacity-0 w-0 max-h-0'}
					`}
				>
					<GameLinks />
					<Permissions />
					<CardStyle />
					<ExternalLinks />
				</div>
				<button
					className={`fixed top-4 right-4 p-2 transition-all duration-250 text-yellow-400 hover:text-yellow-300 hover:drop-shadow-[0_0_3px_#ffd700] cursor-pointer`}
					onClick={() => setOpen((prev) => !prev)}
				>
					<CircleX className="w-5 h-5" />
				</button>
			</Scrim>
			<button
				className={`p-2 transition-all duration-250 text-yellow-400 hover:text-yellow-300 hover:drop-shadow-[0_0_3px_#ffd700] cursor-pointer`}
				onClick={() => setOpen((prev) => !prev)}
			>
				<Gear className="w-5 h-5" />
			</button>
		</div>
	);
}
