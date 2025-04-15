import { TarokkaGameCard, TarokkaGameHigh, TarokkaGameLow, TarokkaGameBase } from '@/types';

export const isHighCard = (card: TarokkaGameCard): card is TarokkaGameHigh =>
	'prophecy' in card && 'allies' in card.prophecy;

export const isLowCard = (card: TarokkaGameCard): card is TarokkaGameLow =>
	'prophecy' in card && 'playerText' in card.prophecy;

export const isBaseCard = (card: TarokkaGameCard): card is TarokkaGameBase => !('prophecy' in card);
