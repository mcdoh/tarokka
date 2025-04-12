import getRandomItems from '@/tools/getRandomItems';

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';

const generateID = (length: number = 6) => {
	return getRandomItems(alphabet.split(''), length).join('');
};

export default generateID;
