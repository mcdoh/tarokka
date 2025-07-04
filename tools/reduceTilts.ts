import { log, validTilt } from '@/tools';
import { GameUpdate, Tilt } from '@/types';

const combineTilts = (tilts: Tilt[]) =>
	tilts.reduce(
		({ pX, pY, rX, rY, count }, { percentX, percentY, rotateX, rotateY }) => ({
			pX: pX + percentX,
			pY: pY + percentY,
			rX: rX + rotateX,
			rY: rY + rotateY,
			count: count + 1,
		}),
		{ pX: 0, pY: 0, rX: 0, rY: 0, count: 0 },
	);

export function reduceTilts(gameData: GameUpdate, localTilt: Tilt[]): Tilt[] {
	const remoteTilts = gameData.tilts;
	const tiltEnabled = gameData.settings.tilt;
	const remoteTiltEnabled = gameData.settings.remoteTilt;

	if (!tiltEnabled) return [];
	if (!remoteTiltEnabled) return Array.from({ length: 5 }, (_, i) => localTilt[i]);

	return Array.from({ length: 5 }, (_, i) => (localTilt[i] ? [localTilt[i]] : []))
		.map((cardTilts, cardIndex) => [...remoteTilts[cardIndex], ...cardTilts])
		.map((cardTilts) => cardTilts.filter(validTilt))
		.map(combineTilts)
		.map(({ pX, pY, rX, rY, count }) => ({
			percentX: count ? pX / count : -1,
			percentY: count ? pY / count : -1,
			rotateX: count ? rX / count : 0,
			rotateY: count ? rY / count : 0,
		}));
}
