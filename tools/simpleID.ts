import { customAlphabet } from 'nanoid';

const alphabet =
  '0123456789abcdefghijklmnopqrstuvwxyz';

const generateID = (length: number = 6) => customAlphabet(alphabet, length);

export default generateID;
