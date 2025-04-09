export interface CardImage {
  id: string;
  back: boolean;
  face: boolean;
  joker: boolean;
  suit: 'Clubs' | 'Diamonds' | 'Hearts' | 'Spades' | null;
  url: string;
}

export interface GameCard extends CardImage {
  flipped: boolean;
}

export interface GameState {
  id: string;
  players: Set<string>;
  cards: GameCard[];
  lastUpdated: number;
}

export interface GameUpdate {
  id: string;
  cards: GameCard[];
}

export interface ClientUpdate {
  gameID: string;
  cardID: string;
}
