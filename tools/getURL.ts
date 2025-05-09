import { cardStyles, standardMap } from '@/constants/tarokka';
import { Settings, TarokkaGameCard } from '@/types';

export default function getURL(card: TarokkaGameCard, settings: Settings) {
	const styleConfig = cardStyles[settings.cardStyle];
	const fileBase = settings.cardStyle === 'standard' ? standardMap[card.id] : card.id;
	return `${styleConfig.baseURL}${fileBase}${card.extension || styleConfig.extension}`;
}
