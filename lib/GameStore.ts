import Cards from './Cards'

import { GameState, GameUpdate } from '../types'

const deck = new Cards();

export default class GameStore {
  private games: Map<string, GameState>;

  constructor() {
    this.games = new Map();
  }

  createGame(id: string): GameState {
    if (this.games.has(id)) throw new Error(`Game ${id} already exists`);

    const newGame: GameState = {
      id,
      players: new Set(),
      cards: deck.select(5).map(card => ({ ...card, flipped: false })),
      lastUpdated: Date.now(),
    };

    this.games.set(id, newGame);

    return newGame;
  }

  joinGame(gameID: string, playerID: string): GameUpdate {
    const game = this.games.get(gameID) || this.createGame(gameID);

    game.players.add(playerID);
    game.lastUpdated = Date.now();

    return this.gameUpdate(game);
  }

  leaveGame(gameID: string, playerID: string): GameState {
    const game = this.getGame(gameID);

    game.players.delete(playerID);
    game.lastUpdated = Date.now();

    return game;
  }

  flipCard(gameID: string, cardID: string): GameUpdate {
    const game = this.getGame(gameID);
    const card = game.cards.find(c => c.id === cardID);

    if (!card) throw new Error(`Card ${cardID} not found`);

    card.flipped = !card.flipped;
    game.lastUpdated = Date.now();

    return this.gameUpdate(game);
  }

  getGame(gameID: string): GameState {
    const game = this.games.get(gameID);

    if (!game) throw new Error(`Game ${gameID} not found`);

    return game;
  }

  gameUpdate(game: GameState): GameUpdate {
    const { id, cards } = game;
    return { id, cards };
  }

  deleteGame(gameID: string): void {
    this.games.delete(gameID);
  }
}
