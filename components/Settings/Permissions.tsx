'use client';

import { useAppContext } from '@/app/AppContext';
import Switch from '@/components/Switch';
import { LOCAL_SETTINGS, SPECTATOR_SETTINGS } from '@/constants';

export default function Permissions() {
	const { gameData, isDM, settings, emitSettings, setLocalSettings } = useAppContext();

	const togglePermission = (key: string) => {
		if (LOCAL_SETTINGS.includes(key)) {
			setLocalSettings((prev) => ({ ...prev, [key]: !prev[key] }));
		} else if (isDM) {
			emitSettings({
				...gameData,
				settings: {
					...gameData.settings,
					[key]: !gameData.settings[key],
				},
			});
		}
	};

	return (
		<>
			{Object.entries(settings)
				.filter(([_key, value]) => typeof value === 'boolean')
				.filter(([key]) => isDM || SPECTATOR_SETTINGS.includes(key))
				.map(([key, value]) => (
					<Switch key={key} label={key} value={value} toggleAction={() => togglePermission(key)} />
				))}
		</>
	);
}
