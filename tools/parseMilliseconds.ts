export interface ParsedMilliseconds {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

export default function parseMilliseconds(timestamp: number): ParsedMilliseconds {
	const SECOND = 1000;
	const MINUTE = 60 * SECOND;
	const HOUR = 60 * MINUTE;
	const DAY = 24 * HOUR;

	const days = Math.floor(timestamp / DAY);
	timestamp %= DAY;

	const hours = Math.floor(timestamp / HOUR);
	timestamp %= HOUR;

	const minutes = Math.floor(timestamp / MINUTE);
	timestamp %= MINUTE;

	const seconds = Math.floor(timestamp / SECOND);
	timestamp %= SECOND;

	return { days, hours, minutes, seconds };
}
