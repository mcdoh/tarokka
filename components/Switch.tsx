export interface SwitchProps {
	label: string;
	value: boolean;
	toggleAction: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Switch({ label, value, toggleAction }: SwitchProps) {
	return (
		<label className="flex items-center justify-between w-full gap-2 cursor-pointer">
			<span className="text-sm capitalize">{label}</span>

			<div className="relative inline-block w-8 h-4 align-middle select-none transition duration-200 ease-in">
				<input type="checkbox" checked={value} onChange={toggleAction} className="sr-only" />
				<div
					className={`block w-8 h-4 rounded-full transition ${
						value ? 'bg-gray-500' : 'bg-gray-600'
					}`}
				/>
				<div
					className={`absolute top-[2px] left-[2px] w-3 h-3 rounded-full transition-transform duration-200 ease-out transform
            ${value ? 'translate-x-4 scale-110 shadow-[0_0_2px_2px_rgba(255,255,255,0.4)]' : 'scale-95'}
            ${value ? 'bg-gray-100' : 'bg-gray-400'}`}
				/>
			</div>
		</label>
	);
}
