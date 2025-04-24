export interface SwitchProps {
	label: string;
	value: boolean;
	toggleAction: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Switch({ label, value, toggleAction }: SwitchProps) {
	return (
		<label className="flex items-center justify-between w-full gap-2 cursor-pointer text-yellow-400 hover:text-yellow-300">
			<span className="text-sm capitalize">{label}</span>

			<div className="relative inline-block w-8 h-4 align-middle select-none transition duration-200 ease-in">
				<input type="checkbox" checked={value} onChange={toggleAction} className="sr-only" />
				<div
					className={`block w-8 h-4 rounded-full transition ${
						value ? 'bg-slate-500' : 'bg-slate-600'
					}`}
				/>
				<div
					className={`absolute top-[2px] left-[2px] w-3 h-3 rounded-full transition-all duration-250 ease-out transform
            ${value ? 'translate-x-4 scale-110' : 'scale-95'}
            ${value ? 'bg-yellow-400' : 'bg-yellow-500'}`}
				/>
			</div>
		</label>
	);
}
