import { getRandomItems } from '@/tools';

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';

export const generateID = (length: number = 6) => {
	return getRandomItems(alphabet.split(''), length).join('');
};
