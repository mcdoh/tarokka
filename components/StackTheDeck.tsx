import { GalleryHorizontalEnd, RefreshCw } from 'lucide-react';

interface StackTheDeckProps {
	onRedraw: () => void;
	onSelect: () => void;
	onHover: (state: React.ReactNode) => void;
	className?: string;
}

export default function StackTheDeck({
	onRedraw,
	onSelect,
	onHover,
	className = '',
}: StackTheDeckProps) {
	const curryHandleClick = (action: () => void) => (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		action();
	};

	return (
		<div
			className={`absolute top-0 right-0 flex flex-col items-center justify-center bg-black/50 rounded-tr-lg rounded-bl-lg ${className}`}
		>
			<button
				onMouseEnter={() => onHover(<p className="text-yellow-400">Redraw</p>)}
				onMouseLeave={() => onHover(null)}
				onTouchStart={() => onHover(<p className="text-yellow-400">Redraw</p>)}
				onTouchEnd={() => onHover(null)}
				className={`p-1 transition-all duration-250 text-yellow-400 hover:text-yellow-300 hover:drop-shadow-[0_0_3px_#ffd700] cursor-pointer`}
				onClick={curryHandleClick(onRedraw)}
			>
				<RefreshCw className="w-3 h-3" />
			</button>

			<button
				onMouseEnter={() => onHover(<p className="text-yellow-400">Select</p>)}
				onMouseLeave={() => onHover(null)}
				onTouchStart={() => onHover(<p className="text-yellow-400">Select</p>)}
				onTouchEnd={() => onHover(null)}
				className={`p-1 transition-all duration-250 text-yellow-400 hover:text-yellow-300 hover:drop-shadow-[0_0_3px_#ffd700] cursor-pointer`}
				onClick={curryHandleClick(onSelect)}
			>
				<GalleryHorizontalEnd className="w-3 h-3" />
			</button>
		</div>
	);
}
