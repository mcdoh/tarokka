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

export interface TarokkaCard {
	id: string;
	name: string;
	card: string;
	description: string;
	aria: string;
	back: boolean;
	suit: 'Coins' | 'Glyphs' | 'High Deck' | 'Stars' | 'Swords' | null;
	url: string;
}

export interface TarokkaGameCard extends TarokkaCard {
	flipped: boolean;
}

export interface GameState {
	id: string;
	players: Set<string>;
	cards: StandardGameCard[] | TarokkaGameCard[];
	lastUpdated: number;
}

export interface GameUpdate {
	id: string;
	cards: StandardGameCard[] | TarokkaGameCard[];
}

export interface ClientUpdate {
	gameID: string;
	cardIndex: number;
}
