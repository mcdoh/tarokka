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
