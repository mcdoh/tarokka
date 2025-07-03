import type { ChangeEventHandler } from 'react';

export interface SwitchProps {
	label: string;
	value: boolean;
	toggleAction: ChangeEventHandler<HTMLInputElement>;
	className?: string;
}

const nonInitialCaps = /(?!^)([A-Z])/g;

export default function Switch({ label, value, toggleAction, className }: SwitchProps) {
	return (
		<label
			className={`flex items-center justify-between gap-2 w-full cursor-pointer text-yellow-400 hover:text-yellow-300 ${className}`}
		>
			<span className="text-sm capitalize">{label.replace(nonInitialCaps, ' $1')}</span>

			<div className="relative inline-block w-8 h-4 align-middle select-none transition duration-200 ease-in">
				<input
					id={`switch-${label}`}
					type="checkbox"
					checked={value}
					onChange={toggleAction}
					className="sr-only peer"
				/>
				<div
					className={`
						block w-8 h-4 rounded-full
						transition-colors duration-200 ease-in
						bg-slate-600 peer-checked:bg-slate-500
					`}
				/>
				<div
					className={`
						absolute top-[2px] left-[2px]
						w-3 h-3 rounded-full
						transition-all duration-250 ease-out
						translate-x-0 scale-95 bg-yellow-500
						peer-checked:translate-x-4 peer-checked:scale-110 peer-checked:bg-yellow-400
					`}
				/>
			</div>
		</label>
	);
}
