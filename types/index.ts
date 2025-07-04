export type CardStyle = 'standard' | 'color' | 'grayscale';

// all = both + back
export type Deck = 'high' | 'common' | 'both' | 'back' | 'all';

export interface Settings {
	cardStyle: CardStyle;
	notes: boolean;
	positionBack: boolean;
	positionFront: boolean;
	prophecy: boolean;
	tilt: boolean;
	remoteTilt: boolean;
}

export interface LocalSettings {
	tilt: boolean;
	remoteTilt: boolean;
}

export interface StandardCard {
	id: string;
	aria: string;
	back: boolean;
	face: boolean;
	joker: boolean;
	suit: 'Clubs' | 'Diamonds' | 'Hearts' | 'Spades' | null;
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
	deck: Deck;
	suit: 'Coins' | 'Glyphs' | 'High Deck' | 'Stars' | 'Swords' | null;
	extension?: string;
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
	dmID: string;
	spectatorID: string;
	players: Set<string>;
	cards: TarokkaGameCard[];
	lastUpdated: number;
	settings: Settings;
	tilts: Tilt[][];
}

export interface GameUpdate {
	dmID: string;
	spectatorID: string;
	cards: TarokkaGameCard[];
	settings: Settings;
	tilts: Tilt[][];
}

export interface ClientUpdate {
	gameID: string;
	cardIndex: number;
	cardID?: string;
}

export interface Layout {
	id: string;
	deck: string;
	name: string;
	text: string;
}

export interface Tilt {
	playerID?: string;
	percentX: number;
	percentY: number;
	rotateX: number;
	rotateY: number;
}
