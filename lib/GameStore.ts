import Deck from '@/lib/TarokkaDeck';
import generateID from '@/tools/simpleID';
import parseMilliseconds from '@/tools/parseMilliseconds';
import { GameState, GameUpdate, Settings } from '@/types';

const deck = new Deck();

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const tilMidnight = () => {
	const now = new Date();
	const midnight = new Date(now);
	midnight.setHours(24, 0, 0, 0);

	return midnight.getTime() - now.getTime();
};

export default class GameStore {
	private startTime: number;
	private totalCreated: number;
	private totalExpired: number;
	private totalUnused: number;

	private dms: Map<string, GameState>;
	private spectators: Map<string, GameState>;
	private players: Map<string, string>;

	constructor() {
		this.startTime = Date.now();
		this.totalCreated = 0;
		this.totalExpired = 0;
		this.totalUnused = 0;

		this.dms = new Map();
		this.spectators = new Map();
		this.players = new Map();

		setInterval(() => this.log(), 15 * MINUTE);
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

		this.totalCreated++;
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

	log() {
		const now = Date.now();
		const uptime = now - this.startTime;

		const { days, hours, minutes, seconds } = parseMilliseconds(uptime);

		const dayLog = days ? ` ${days} ${days > 1 ? 'days' : 'day'}` : '';
		const hourLog = hours ? ` ${hours} ${hours > 1 ? 'hours' : 'hour'}` : '';
		const minuteLog = minutes ? ` ${minutes} ${minutes > 1 ? 'minutes' : 'minute'}` : '';

		const uptimeLog = `Up${dayLog}${hourLog}${minuteLog} ${seconds} seconds`;

		console.log('-'.repeat(uptimeLog.length));
		console.log(uptimeLog);
		console.log(`Games: ${this.dms.size}`);
		console.log(`Players: ${this.players.size}`);
		console.log('-'.repeat(uptimeLog.length));
	}

	wrapUp() {
		const now = Date.now();
		const uptime = now - this.startTime;

		const { days, hours, minutes, seconds } = parseMilliseconds(uptime);

		const dayLog = days ? ` ${days} ${days > 1 ? 'days' : 'day'}` : '';
		const hourLog = hours ? ` ${hours} ${hours > 1 ? 'hours' : 'hour'}` : '';
		const minuteLog = minutes ? ` ${minutes} ${minutes > 1 ? 'minutes' : 'minute'}` : '';

		const uptimeLog = `Up${dayLog}${hourLog}${minuteLog} ${seconds} seconds`;

		console.log('='.repeat(uptimeLog.length));
		console.log(uptimeLog);
		console.log('Now:', Date.now());
		console.log(`Created: ${this.totalCreated}`);
		console.log(`Expired: ${this.totalExpired}`);
		console.log(`Unused: ${this.totalUnused}`);
		console.log('='.repeat(uptimeLog.length));

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

		expired.forEach(this.deleteGame);
		unused.forEach(this.deleteGame);
	}

	deleteGame(game: GameState): void {
		console.log(Date.now(), 'DELETE', game);

		this.dms.delete(game.dmID);
		this.spectators.delete(game.spectatorID);
	}
}
