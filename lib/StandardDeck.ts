import { getRandomItems } from '@/tools';
import cards from '@/constants/standardCards';
import type { StandardCard } from '@/types';

export interface Options {
	back: number;
	jokers: boolean;
}

export interface OptionProps {
	back?: number;
	jokers?: boolean;
}

const DEFAULT_OPTIONS = {
	jokers: false,
	back: 1,
};

export default class Cards {
	private options: Options;

	private deck: StandardCard[] = [];
	private backs: StandardCard[] = [];
	private jokers: StandardCard[] = [];

	constructor(options: OptionProps = {}) {
		this.options = { ...DEFAULT_OPTIONS, ...options };

		this.deck = cards.filter((card) => !card.back && (this.options.jokers || !card.joker));
		this.backs = cards.filter((card) => card.back);
		this.jokers = cards.filter((card) => card.joker);
	}

	select(count: number): StandardCard[] {
		return getRandomItems(this.deck, count);
	}

	getBack(style: number): StandardCard {
		style = style || this.options.back;
		return this.backs.find((card) => card.id.startsWith(String(style))) || this.backs[0];
	}

	getJokers(): StandardCard[] {
		return this.jokers;
	}
}
