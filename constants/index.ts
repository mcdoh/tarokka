export * from '@/constants/standardCards';
export * from '@/constants/tarokka';
export * from '@/constants/tarokkaCards';
export * from '@/constants/time';

import type { GameUpdate, LocalSettings, Settings } from '@/types';

export const SETTINGS: Settings = {
	cardStyle: 'color',
	notes: false,
	positionBack: false,
	positionFront: false,
	prophecy: false,
	tilt: true,
	remoteTilt: false,
};

export const GAME_START: GameUpdate = {
	dmID: '',
	spectatorID: '',
	cards: [],
	settings: SETTINGS,
	tilts: Array.from({ length: 5 }, () => []),
};

export const LOCAL_DEFAULTS: LocalSettings = {
	tilt: true,
	remoteTilt: true,
};

export const LOCAL_SETTINGS = ['tilt', 'remoteTilt'];

export const SPECTATOR_SETTINGS = ['tilt', 'remoteTilt'];
