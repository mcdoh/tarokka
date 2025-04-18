import { Layout } from '@/types';

// map our five cards to their appropriate
// locations in a 3x3 grid
// 012    █1█
// 345 -> 042
// 678    █3█
export const cardMap: Record<number, number> = {
	3: 0,
	1: 1,
	5: 2,
	7: 3,
	4: 4,
};

export const layout: Layout[] = [
	{
		id: 'tome',
		deck: 'low',
		name: 'Tome of Strahd',
		text: 'This card tells of history. Knowledge of the ancient will help you better understand your enemy.',
	},
	{
		id: 'ravenkind',
		deck: 'low',
		name: 'Holy Symbol of Ravenkind',
		text: 'This card tells of a powerful force for good and protection, a holy symbol of great hope.',
	},
	{
		id: 'sunsword',
		deck: 'low',
		name: 'Sunsword',
		text: 'This is a card of power and strength. It tells of a weapon of vengeance: a sword of sunlight.',
	},
	{
		id: 'ally',
		deck: 'high',
		name: 'Strahd’s Enemy',
		text: 'This card sheds light on one who will help you greatly in the battle against darkness.',
	},
	{
		id: 'strahd',
		deck: 'high',
		name: 'Strahd',
		text: 'Your enemy is a creature of darkness, whose powers are beyond mortality. This card will lead you to him!',
	},
];

export const cardStyles = {
	color: {
		baseURL: '/img/color/',
		extension: '.webp',
	},
	grayscale: {
		baseURL: '/img/grayscale/',
		extension: '.webp',
	},
	standard: {
		baseURL: '/img/standard/',
		extension: '.svg',
	},
};

export const standardMap = {
	abjurer: '4C',
	anarchist: '6H',
	artifact: '1J',
	avenger: 'AS',
	back: '1B',
	beast: 'JD',
	beggar: '6D',
	berserker: '6S',
	bishop: '8H',
	'broken-one': 'KD',
	charlatan: '7H',
	conjurer: '9C',
	darklord: 'KS',
	dictator: '8S',
	diviner: '2C',
	donjon: 'KC',
	druid: '5H',
	elementalist: '5C',
	enchanter: '3C',
	evoker: '6C',
	executioner: 'JS',
	ghost: 'KH',
	'guild-member': '5D',
	healer: '3H',
	'hooded-one': '7S',
	horseman: '2J',
	illusionist: '7C',
	innocent: 'QH',
	marionette: 'JH',
	mercenary: '4S',
	merchant: '4D',
	miser: '9D',
	missionary: '2H',
	mists: 'QS',
	monk: 'AH',
	myrmidon: '5S',
	necromancer: '8C',
	paladin: '2S',
	philanthropist: '2D',
	priest: '10H',
	raven: 'QC',
	rogue: '10D',
	seer: 'JC',
	shepherd: '4H',
	soldier: '3S',
	swashbuckler: 'AD',
	'tax-collector': '8D',
	tempter: 'QD',
	thief: '7D',
	torturer: '9S',
	trader: '3D',
	traitor: '9H',
	transmuter: 'AC',
	warrior: '10S',
	wizard: '10C',
};
