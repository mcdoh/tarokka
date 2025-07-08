'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import useSocket from '@/hooks/useSocket';
import { reduceTilts } from '@/tools';

import { GAME_START, LOCAL_DEFAULTS } from '@/constants';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { GameUpdate, LocalSettings, Settings, Tilt } from '@/types';

const AppContext = createContext<AppContext | undefined>(undefined);

export interface AppContext {
	gameData: GameUpdate;
	isDM: boolean;
	noGame: boolean;
	selectCardIndex: number;
	settings: Settings;
	tilts: Tilt[];
	emitFlip: (cardIndex: number) => void;
	emitSettings: (gameData: GameUpdate) => void;
	emitRedraw: (cardIndex: number) => void;
	emitSelect: (cardID: string) => void;
	setGameID: (gameID: string) => void;
	setLocalSettings: Dispatch<SetStateAction<LocalSettings>>;
	setSelectCardIndex: (cardIndex: number) => void;
	setLocalTilt: (tilt: Tilt[]) => void;
}

export function AppProvider({ children }: { children: ReactNode }) {
	const [gameData, setGameData] = useState<GameUpdate>({ ...GAME_START });
	const [localSettings, setLocalSettings] = useState<LocalSettings>(() => ({ ...LOCAL_DEFAULTS }));
	const [gameID, setGameID] = useState('');
	const [noGame, setNoGame] = useState(false);
	const [selectCardIndex, setSelectCardIndex] = useState(-1);
	const [localTilt, setLocalTilt] = useState<Tilt[]>([]);

	const { emitFlip, emitRedraw, emitSelect, emitSettings, emitTilt } = useSocket({
		gameID,
		setGameData,
		setNoGame,
	});

	useEffect(() => {
		if (localSettings.remoteTilt) {
			const cardIndex = localTilt.findIndex((tilt) => !!tilt);

			if (localTilt[cardIndex]) {
				emitTilt(cardIndex, localTilt[cardIndex]);
			} else {
				// cardIndex does not matter
				// all tilts for this user will be cleared
				emitTilt(0, { percentX: -1, percentY: -1, rotateX: 0, rotateY: 0 });
			}
		}
	}, [localTilt, localSettings]);

	const handleSelect = (cardID: string) => {
		setSelectCardIndex(-1);

		emitSelect(selectCardIndex, cardID);
	};

	const { dmID } = gameData;
	const isDM = !!dmID;
	const settings = { ...gameData.settings, ...localSettings };

	const appInterface = {
		gameData,
		isDM,
		noGame,
		selectCardIndex,
		settings,
		tilts: reduceTilts(gameData, localTilt, settings),
		emitFlip,
		emitSettings,
		emitRedraw,
		emitSelect: handleSelect,
		setGameID,
		setLocalSettings,
		setSelectCardIndex,
		setLocalTilt,
	};

	return <AppContext.Provider value={appInterface}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContext {
	const context = useContext(AppContext);
	if (!context) throw new Error('useAppContext must be used within AppProvider');
	return context;
}
