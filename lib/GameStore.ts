import Deck from '@/lib/TarokkaDeck';
import generateID from '@/tools/simpleID';
import { GameState, GameUpdate } from '@/types';

const deck = new Deck();

export default class GameStore {
	private dms: Map<string, GameState>;
	private spectators: Map<string, GameState>;

	constructor() {
		this.dms = new Map();
		this.spectators = new Map();
	}

	createGameIDs() {
		const dmID = generateID();
		const spectatorID = generateID();

		if (
			this.dms.has(dmID) ||
			this.dms.has(spectatorID) ||
			this.spectators.has(dmID) ||
			this.spectators.has(spectatorID)
		) {
			return this.createGameIDs();
		}

		return {
			dmID,
			spectatorID,
		};
	}

	createGame(): GameState {
		const { dmID, spectatorID } = this.createGameIDs();

		const newGame: GameState = {
			dmID,
			spectatorID,
			players: new Set(),
			cards: deck.getHand(),
			lastUpdated: Date.now(),
		};

		this.dms.set(dmID, newGame);
		this.spectators.set(spectatorID, newGame);

		return newGame;
	}

	joinGame(gameID: string, playerID: string): GameUpdate {
		const game = this.getGame(gameID);

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

	flipCard(gameID: string, cardIndex: number): GameUpdate {
		const game = this.getGame(gameID);
		const card = game.cards[cardIndex];

		if (!card) throw new Error(`Card ${cardIndex} not found`);

		card.flipped = !card.flipped;
		game.lastUpdated = Date.now();

		return this.gameUpdate(game);
	}

	getGame(gameID: string): GameState {
		const game = this.dms.get(gameID) || this.spectators.get(gameID);

		if (!game) throw new Error(`Game ${gameID} not found`);

		return game;
	}

	gameUpdate(game: GameState): GameUpdate {
		const { dmID, spectatorID, cards } = game;

		return { dmID, spectatorID, cards };
	}

	deleteGame(gameID: string): void {
		this.dms.delete(gameID);
		this.spectators.delete(gameID);
	}
}
