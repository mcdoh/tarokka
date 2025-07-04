import { cardStyles, standardMap } from '@/constants/tarokka';
import { Settings, TarokkaCard, TarokkaGameCard } from '@/types';

export const getURL = (card: TarokkaCard | TarokkaGameCard, settings: Settings) => {
	const styleConfig = cardStyles[settings.cardStyle];
	const fileBase = settings.cardStyle === 'standard' ? standardMap[card.id] : card.id;
	return `${styleConfig.baseURL}${fileBase}${card.extension || styleConfig.extension}`;
};
