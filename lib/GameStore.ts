import Deck from '@/lib/TarokkaDeck';
import generateID from '@/tools/simpleID';
import { GameState, GameUpdate, Settings } from '@/types';

const deck = new Deck();

export default class GameStore {
	private dms: Map<string, GameState>;
	private spectators: Map<string, GameState>;
	private players: Map<string, string>;

	constructor() {
		this.dms = new Map();
		this.spectators = new Map();
		this.players = new Map();
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
			settings: {
				positionBack: true,
				positionFront: true,
				prophecy: true,
				notes: true,
				cardStyle: 'color',
			},
		};

		this.dms.set(dmID, newGame);
		this.spectators.set(spectatorID, newGame);

		return newGame;
	}

	joinGame(gameID: string, playerID: string): GameUpdate {
		const game = this.getGame(gameID);

		game.players.add(playerID);
		game.lastUpdated = Date.now();
		this.players.set(playerID, gameID);

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

	updateSettings(gameID: string, settings: Settings) {
		const game = this.getGame(gameID);

		Object.assign(game.settings, settings);

		return this.gameUpdate(game);
	}

	getGame(gameID: string): GameState {
		const game = this.dms.get(gameID) || this.spectators.get(gameID);

		if (!game) throw new Error(`Game ${gameID} not found`);

		return game;
	}

	gameUpdate(game: GameState): GameUpdate {
		const { dmID, spectatorID, cards, settings } = game;

		return { dmID, spectatorID, cards, settings };
	}

	playerExit(playerID: string): GameState {
		const gameID = this.players.get(playerID);

		if (!gameID) throw new Error(`Player ${playerID} not found`);

		this.players.delete(playerID);
		return this.leaveGame(gameID, playerID);
	}

	deleteGame(gameID: string): void {
		this.dms.delete(gameID);
		this.spectators.delete(gameID);
	}
}
