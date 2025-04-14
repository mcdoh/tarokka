import getRandomItems from '@/tools/getRandomItems';
import cards from '@/constants/tarokkaCards';
import type { TarokkaCard, TarokkaGameCard } from '@/types';

export default class TarokkaDeck {
	private highDeck: TarokkaCard[] = [];
	private commonDeck: TarokkaCard[] = [];
	private backs: TarokkaCard[] = [];

	constructor() {
		this.highDeck = cards.filter((card) => !card.back && card.suit === 'High Deck');
		this.commonDeck = cards.filter((card) => !card.back && card.suit !== 'High Deck');
		this.backs = cards.filter((card) => card.back);
	}

	getHand(): TarokkaGameCard[] {
		return [...getRandomItems(this.commonDeck, 3), ...getRandomItems(this.highDeck, 2)].map(
			(card) => ({ ...card, flipped: false }),
		);
	}

	getBack(): TarokkaCard {
		return this.backs[0];
	}
}
