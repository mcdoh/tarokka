'use client';

import { useState } from 'react';
import { Settings as Gear } from 'lucide-react';

import { Settings } from '@/types';

type PermissionTogglePanelProps = {
	settings: Settings;
	changeAction: (updatedSettings: Settings) => void;
};

export default function PermissionTogglePanel({
	settings,
	changeAction,
}: PermissionTogglePanelProps) {
	const [open, setOpen] = useState(false);

	const togglePermission = (key: string) => {
		changeAction({ ...settings, [key]: !settings[key] });
	};

	return (
		<div className="fixed top-4 right-4 z-50">
			<button
				className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow"
				onClick={() => setOpen((prev) => !prev)}
			>
				<Gear className="w-5 h-5" />
			</button>

			{open && (
				<div className="mt-2 bg-white border border-gray-300 shadow-lg rounded p-4 space-y-2">
					{Object.entries(settings).map(([key, value]) => (
						<label key={key} className="flex items-center justify-between">
							<span className="text-sm capitalize">{key}</span>
							<input type="checkbox" checked={value} onChange={() => togglePermission(key)} />
						</label>
					))}
				</div>
			)}
		</div>
	);
}
