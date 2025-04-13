export interface StandardCard {
	id: string;
	aria: string;
	back: boolean;
	face: boolean;
	joker: boolean;
	suit: 'Clubs' | 'Diamonds' | 'Hearts' | 'Spades' | null;
	url: string;
}

export interface StandardGameCard extends StandardCard {
	flipped: boolean;
}

export interface TarokkaBase {
	id: string;
	name: string;
	card: string;
	description: string;
	aria: string;
	back: boolean;
	suit: 'Coins' | 'Glyphs' | 'High Deck' | 'Stars' | 'Swords' | null;
	url: string;
}

export interface TarokkaGameBase extends TarokkaBase {
	flipped: boolean;
}

export interface TarokkaHigh extends TarokkaBase {
	prophecy: {
		allies: {
			ally: string;
			dmText: string;
			playerText: string;
		}[];
		strahd: {
			dmText: string;
			playerText: string;
		};
	};
}

export interface TarokkaGameHigh extends TarokkaHigh {
	flipped: boolean;
}

export interface TarokkaLow extends TarokkaBase {
	value: number;
	prophecy: {
		dmText: string;
		location: string;
		playerText: string;
	};
}

export interface TarokkaGameLow extends TarokkaLow {
	flipped: boolean;
}

export type TarokkaCard = TarokkaBase | TarokkaHigh | TarokkaLow;

export type TarokkaGameCard = TarokkaGameBase | TarokkaGameHigh | TarokkaGameLow;

export interface GameState {
	id: string;
	players: Set<string>;
	cards: TarokkaGameCard[];
	lastUpdated: number;
}

export interface GameUpdate {
	id: string;
	cards: TarokkaGameCard[];
}

export interface ClientUpdate {
	gameID: string;
	cardIndex: number;
}
