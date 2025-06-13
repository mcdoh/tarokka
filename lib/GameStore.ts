import Deck from '@/lib/TarokkaDeck';
import generateID from '@/tools/simpleID';
import parseMilliseconds from '@/tools/parseMilliseconds';
import { HOUR, DAY } from '@/constants/time';
import { GameState, GameUpdate, Settings } from '@/types';

const deck = new Deck();

const tilMidnight = () => {
	const now = new Date();
	const midnight = new Date(now);
	midnight.setHours(24, 0, 0, 0);

	return midnight.getTime() - now.getTime();
};

const uptime = (startTime: number) => {
	const now = Date.now();
	const uptime = now - startTime;

	const { days, hours, minutes, seconds } = parseMilliseconds(uptime);

	const dayLog = days ? ` ${days} ${days > 1 ? 'days' : 'day'}` : '';
	const hourLog = hours ? ` ${hours} ${hours > 1 ? 'hours' : 'hour'}` : '';
	const minuteLog = minutes ? ` ${minutes} ${minutes > 1 ? 'minutes' : 'minute'}` : '';
	const secondLog = seconds ? ` ${seconds} ${seconds > 1 ? 'seconds' : 'second'}` : '';

	return `Up${dayLog}${hourLog}${minuteLog}${secondLog}`;
};

export default class GameStore {
	private startTime: number;
	private totalCreated: number;
	private totalExpired: number;
	private totalUnused: number;

	private startUps: Set<string>; // homepage socket IDs
	private dms: Map<string, GameState>; // DM socket ID -> game
	private spectators: Map<string, GameState>; // spectator socket ID -> game
	private players: Map<string, GameState>; // socket ID -> game

	constructor() {
		this.startTime = Date.now();
		this.totalCreated = 0;
		this.totalExpired = 0;
		this.totalUnused = 0;

		this.startUps = new Set();
		this.dms = new Map();
		this.spectators = new Map();
		this.players = new Map();

		setInterval(() => this.log(), HOUR);
		setInterval(() => this.cleanUp(), HOUR);

		setTimeout(() => this.wrapUp(), tilMidnight());
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

	createGame(startUpID: string): GameState {
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

		this.totalCreated++;
		this.startUps.add(startUpID);
		this.dms.set(dmID, newGame);
		this.spectators.set(spectatorID, newGame);

		return newGame;
	}

	joinGame(gameID: string, playerID: string): GameUpdate {
		const game = this.getGame(gameID);

		game.players.add(playerID);
		game.lastUpdated = Date.now();
		this.players.set(playerID, game);

		return this.gameUpdate(game);
	}

	leaveGame(game: GameState, playerID: string): GameState {
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

	redraw(gameID: string, cardIndex: number): GameUpdate {
		const game = this.getGame(gameID);
		const card = game.cards[cardIndex];

		if (!card) throw new Error(`Card ${cardIndex} not found`);

		game.cards[cardIndex] =
			card.suit === 'High Deck' ? deck.drawHigh(game.cards) : deck.drawLow(game.cards);
		game.lastUpdated = Date.now();

		return this.gameUpdate(game);
	}

	select(gameID: string, cardIndex: number, cardID: string): GameUpdate {
		const game = this.getGame(gameID);
		const card = game.cards[cardIndex];
		const replacement = deck.select(cardID);

		if (!card) throw new Error(`Card ${cardIndex} not found`);
		if (!replacement) throw new Error(`Card ${cardID} not found`);

		game.cards[cardIndex] = replacement;
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

	playerExit(playerID: string): GameState | null {
		if (this.startUps.has(playerID)) {
			this.startUps.delete(playerID);

			return null;
		} else {
			const game = this.players.get(playerID);

			if (!game) throw new Error(`Player ${playerID} not found`);

			this.players.delete(playerID);
			return this.leaveGame(game, playerID);
		}
	}

	log() {
		const uptimeLog = uptime(this.startTime);

		console.log('-'.repeat(uptimeLog.length));
		console.log(uptimeLog);
		console.log(`Games: ${this.dms.size}`);
		console.log(`Players: ${this.players.size}`);
	}

	wrapUp() {
		const uptimeLog = uptime(this.startTime);

		console.log('='.repeat(uptimeLog.length));
		console.log(uptimeLog);
		console.log('Now:', Date.now());
		console.log(`Created: ${this.totalCreated}`);
		console.log(`Expired: ${this.totalExpired}`);
		console.log(`Unused: ${this.totalUnused}`);

		this.totalCreated = 0;
		this.totalExpired = 0;
		this.totalUnused = 0;

		setTimeout(() => this.wrapUp(), tilMidnight());
	}

	cleanUp() {
		const now = Date.now();

		const expired = [...this.dms.values()].filter(({ lastUpdated }) => lastUpdated < now - DAY);
		const unused = [...this.dms.values()].filter(
			({ lastUpdated, players }) => players.size === 0 && lastUpdated < now - HOUR,
		);

		this.totalExpired += expired.length;
		this.totalUnused += unused.length;

		expired.forEach((game) => {
			game.players.forEach((playerID) => this.players.delete(playerID));
			this.deleteGame(game);
		});

		unused.forEach((game) => this.deleteGame(game));
	}

	deleteGame(game: GameState): void {
		console.log(Date.now(), 'DELETE', game.dmID, game.spectatorID);

		this.dms.delete(game.dmID);
		this.spectators.delete(game.spectatorID);
	}
}
