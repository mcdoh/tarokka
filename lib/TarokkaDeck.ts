import { getRandomItems } from '@/tools';
import cards from '@/constants/tarokkaCards';
import type { TarokkaCard, TarokkaGameCard } from '@/types';

export default class TarokkaDeck {
	private highDeck: TarokkaCard[] = [];
	private commonDeck: TarokkaCard[] = [];
	private backs: TarokkaCard[] = [];

	constructor() {
		this.highDeck = cards.filter((card) => card.deck === 'high');
		this.commonDeck = cards.filter((card) => card.deck === 'common');
		this.backs = cards.filter((card) => card.back);
	}

	getHand(): TarokkaGameCard[] {
		return [...getRandomItems(this.commonDeck, 3), ...getRandomItems(this.highDeck, 2)].map(
			(card) => ({ ...card, flipped: false }),
		);
	}

	getLow(): TarokkaGameCard[] {
		return this.commonDeck.map((card) => ({ ...card, flipped: false }));
	}

	getHigh(): TarokkaGameCard[] {
		return this.highDeck.map((card) => ({ ...card, flipped: false }));
	}

	drawLow(exclude: TarokkaGameCard[] = []): TarokkaGameCard {
		const excludeIDs = exclude.map(({ id }) => id);

		return {
			...getRandomItems(
				this.commonDeck.filter(({ id }) => !excludeIDs.includes(id)),
				1,
			)[0],
			flipped: false,
		};
	}

	drawHigh(exclude: TarokkaGameCard[] = []): TarokkaGameCard {
		const excludeIDs = exclude.map(({ id }) => id);

		return {
			...getRandomItems(
				this.highDeck.filter(({ id }) => !excludeIDs.includes(id)),
				1,
			)[0],
			flipped: false,
		};
	}

	select(id: string): TarokkaGameCard | null {
		const card = cards.find((card) => card.id === id);

		if (!card) return null;

		return {
			...card,
			flipped: false,
		};
	}

	getBack(): TarokkaCard {
		return this.backs[0];
	}
}
