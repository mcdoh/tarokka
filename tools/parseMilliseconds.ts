import { SECOND, MINUTE, HOUR, DAY } from '@/constants/time';

export interface ParsedMilliseconds {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

export default function parseMilliseconds(timestamp: number): ParsedMilliseconds {
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
