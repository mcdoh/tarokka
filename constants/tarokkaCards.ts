import { TarokkaCard } from '@/types';

const tarokkaCards: TarokkaCard[] = [
	{
		id: 'back',
		name: 'Card Back',
		card: 'Back of card',
		deck: 'back',
		suit: null,
		aria: 'Back of card',
		description: 'Back of card',
		back: true,
		extension: '.png',
	},
	{
		id: 'swashbuckler',
		name: 'Swashbuckler',
		card: 'One of Coins',
		deck: 'common',
		suit: 'Coins',
		aria: 'Coins 01 Swashbuckler',
		description: 'Those who like money yet give it up freely; likable rogues and rapscallions',
		back: false,
		value: 1,
		prophecy: {
			dmText: 'The treasure lies in the crypt of Endorovich (chapter4, area K84, crypt 7).',
			location: 'Castle Ravenloft',
			playerText:
				'I see the skeleton of a deadly warrior, lying on a bed of stone flanked by gargoyles.',
		},
	},
	{
		id: 'philanthropist',
		name: 'Philanthropist',
		card: 'Two of Coins',
		deck: 'common',
		suit: 'Coins',
		aria: 'Coins 02 Philanthropist',
		description:
			'Charity and giving on a grand scale; those who use wealth to fight evil and sickness',
		back: false,
		value: 2,
		prophecy: {
			dmText: 'The treasure is in the nursery of the Abbey of Saint Markovia (chapter8, area S23).',
			location: 'Village of Kresk',
			playerText:
				'Look to a place where sickness and madness are bred. Where children once cried, the treasure lies still.',
		},
	},
	{
		id: 'trader',
		name: 'Trader',
		card: 'Three of Coins',
		deck: 'common',
		suit: 'Coins',
		aria: 'Coins 03 Trader',
		description: 'Commerce; smuggling and black markets; fair and equitable trades',
		back: false,
		value: 3,
		prophecy: {
			dmText:
				'The treasure lies in the glassblower’s workshop in the Wizard of Wines (chapter 12, area W10).',
			location: 'The Wizard of Wines',
			playerText: 'Look to the wizard of wines! In wood and sand the treasure hides.',
		},
	},
	{
		id: 'merchant',
		name: 'Merchant',
		card: 'Four of Coins',
		deck: 'common',
		suit: 'Coins',
		aria: 'Coins 04 Merchant',
		description:
			'A rare commodity or business opportunity; deceitful or dangerous business transactions',
		back: false,
		value: 4,
		prophecy: {
			dmText: 'The treasure lies in Castle Ravenloft’s wine cellar (chapter 4, area K63).',
			location: 'Castle Ravenloft',
			playerText: 'Seek a cask that once contained the finest wine, of which not a drop remains.',
		},
	},
	{
		id: 'guild-member',
		name: 'Guild Member',
		card: 'Five of Coins',
		deck: 'common',
		suit: 'Coins',
		aria: 'Coins 05 Guild Member',
		description: "Like-minded individuals joined together in a common goal; pride in one's work",
		back: false,
		value: 5,
		prophecy: {
			dmText: 'The treasure lies in the crypt of Artank Swilovich (chapter 4, area K84, crypt 5).',
			location: 'Castle Ravenloft',
			playerText: 'I see a room full of bottles. It is the tomb of a guild member.',
		},
	},
	{
		id: 'beggar',
		name: 'Beggar',
		card: 'Six of Coins',
		deck: 'common',
		suit: 'Coins',
		aria: 'Coins 06 Beggar',
		description: 'Sudden change in economic status or fortune',
		back: false,
		value: 6,
		prophecy: {
			dmText: 'The treasure is hidden in Kasimir’s hovel (chapter 5, area N9a).',
			location: 'Town of Vallaki',
			playerText:
				'A wounded elf has what you seek. He will part with the treasure to see his dark dreams fulfilled.',
		},
	},
	{
		id: 'thief',
		name: 'Thief',
		card: 'Seven of Coins',
		deck: 'common',
		suit: 'Coins',
		aria: 'Coins 07 Thief',
		description:
			'Those who steal or burgle; a loss of property, beauty, innocence, friendship, or reputation',
		back: false,
		value: 7,
		prophecy: {
			dmText:
				'The treasure is buried in the graveyard at the River Ivlis crossroads (chapter 2, area F).',
			location: 'River Ivlis Crossroads',
			playerText: 'What you seek lies at the crossroads of life and death, among the buried dead.',
		},
	},
	{
		id: 'tax-collector',
		name: 'Tax Collector',
		card: 'Eight of Coins',
		deck: 'common',
		suit: 'Coins',
		aria: 'Coins 08 Tax Collector',
		description: 'Corruption; honesty in an otherwise corrupt government or organization',
		back: false,
		value: 8,
		prophecy: {
			dmText:
				'The treasure is hidden in the Vistani treasure wagon (chapter 5, area N9i). "A missing child" refers to Arabelle (see chapter 2, area L).',
			location: 'Town of Vallaki',
			playerText:
				'The Vistani have what you seek. A missing child holds the key to the treasure’s release.',
		},
	},
	{
		id: 'miser',
		name: 'Miser',
		card: 'Nine of Coins',
		deck: 'common',
		suit: 'Coins',
		aria: 'Coins 09 Miser',
		description:
			'Hoarded wealth; those who are irreversibly unhappy or who think money is meaningless',
		back: false,
		value: 9,
		prophecy: {
			dmText: 'The treasure lies in Castle Ravenloft’s treasury (chapter 4, area K41).',
			location: 'Castle Ravenloft',
			playerText: 'Look for a fortress inside a fortress, in a place hidden behind fire.',
		},
	},
	{
		id: 'rogue',
		name: 'Rogue',
		card: 'Master of Coins',
		deck: 'common',
		suit: 'Coins',
		aria: 'Coins 10 Rogue',
		description:
			'Anyone for whom money is important; those who believe money is the key to their success',
		back: false,
		value: 10,
		prophecy: {
			dmText: 'The treasure is hidden in the attic of the Blue Water Inn (chapter 5, area N2q).',
			location: 'Town of Vallaki',
			playerText: 'I see a nest of ravens. There you will find the prize.',
		},
	},
	{
		id: 'monk',
		name: 'Monk',
		card: 'One of Glyphs',
		deck: 'common',
		suit: 'Glyphs',
		aria: 'Glyphs 01 Monk',
		description:
			'Serenity; inner strength and self-reliance; supreme confidence bereft of arrogance',
		back: false,
		value: 1,
		prophecy: {
			dmText:
				'The treasure lies in the main hall of the Abbey of Saint Markovia (chapter 8, area S13).',
			location: 'Village of Kresk',
			playerText: 'The treasure you seek is hidden behind the sun, in the house of a saint.',
		},
	},
	{
		id: 'missionary',
		name: 'Missionary',
		card: 'Two of Glyphs',
		deck: 'common',
		suit: 'Glyphs',
		aria: 'Glyphs 02 Missionary',
		description:
			'Those who spread wisdom and faith to others; warnings of the spread of fear and ignorance',
		back: false,
		value: 2,
		prophecy: {
			dmText:
				'The treasure is hidden inside on the scarecrows in the garden of the Abbey of Saint Markovia (chapter 8, area S9).',
			location: 'Village of Kresk',
			playerText:
				'I see a garden dusted with snow, watched over by a scarecrow with a sackcloth grin. Look not to the garden but to the guardian.',
		},
	},
	{
		id: 'healer',
		name: 'Healer',
		card: 'Three of Glyphs',
		deck: 'common',
		suit: 'Glyphs',
		aria: 'Glyphs 03 Healer',
		description:
			'Healing; a contagious illness, disease, or curse; those who practice the healing arts',
		back: false,
		value: 3,
		prophecy: {
			dmText:
				'The treasure lies beneath the gazebo in the Shrine of the White Sun (chapter 8, area S4).',
			location: 'Village of Kresk',
			playerText: 'Look to the west. Find a pool blessed by the light of the white sun.',
		},
	},
	{
		id: 'shepherd',
		name: 'Shepherd',
		card: 'Four of Glyphs',
		deck: 'common',
		suit: 'Glyphs',
		aria: 'Glyphs 04 Shepherd',
		description:
			'Those who protect others; one who bears a burden far too great to be shouldered alone',
		back: false,
		value: 4,
		prophecy: {
			dmText:
				'The treasure lies in the tomb of King Barov and Queen Ravenovia (chapter 4, area K88).',
			location: 'Castle Ravenloft',
			playerText: 'Find the mother - she who gave birth to evil.',
		},
	},
	{
		id: 'druid',
		name: 'Druid',
		card: 'Five of Glyphs',
		deck: 'common',
		suit: 'Glyphs',
		aria: 'Glyphs 05 Druid',
		description:
			'The ambivalence and cruelty of nature and those who feel drawn to it; inner turmoil',
		back: false,
		value: 5,
		prophecy: {
			dmText:
				'The treasure lies at the base of the Gulthias tree (chapter 14, area Y4). Any wereraven encountered in the wilderness can lead the characters to the location.',
			location: 'Yester Hill',
			playerText:
				'An evil tree grows atop a hill of graves where the ancient dead sleep. The ravens can help you find it. Look for the treasure there.',
		},
	},
	{
		id: 'anarchist',
		name: 'Anarchist',
		card: 'Six of Glyphs',
		deck: 'common',
		suit: 'Glyphs',
		aria: 'Glyphs 06 Anarchist',
		description: 'A fundamental change brought on by one whose beliefs are being put to the test',
		back: false,
		value: 6,
		prophecy: {
			dmText: 'The treasure lies in Castle Ravenloft’s hall of bones (chapter 4, area K67).',
			location: 'Castle Ravenloft',
			playerText:
				'I see walls of bones, the chandelier of bones, and table of bones - all that remains of enemies long forgotten.',
		},
	},
	{
		id: 'charlatan',
		name: 'Charlatan',
		card: 'Seven of Glyphs',
		deck: 'common',
		suit: 'Glyphs',
		aria: 'Glyphs 07 Charlatan',
		description: 'Liars; those who profess to believe one thing but actually believe another',
		back: false,
		value: 7,
		prophecy: {
			dmText: 'The treasure lies in the attic of Old Bonegrinder (chapter 6, areas O4).',
			location: 'Old Bonegrinder',
			playerText: 'I see a lonely mill on a precipice. The treasure lies within.',
		},
	},
	{
		id: 'bishop',
		name: 'Bishop',
		card: 'Eight of Glyphs',
		deck: 'common',
		suit: 'Glyphs',
		aria: 'Glyphs 08 Bishop',
		description: 'Strict adherence to a code or a belief; those who plot, plan, and scheme',
		back: false,
		value: 8,
		prophecy: {
			dmText:
				'The treasure lies in the sealed treasury of the Amber Temple (chapter 13, area X40).',
			location: 'Amber Temple',
			playerText: 'What you seek lies in a pile of treasure beyond a set of amber doors.',
		},
	},
	{
		id: 'traitor',
		name: 'Traitor',
		card: 'Nine of Glyphs',
		deck: 'common',
		suit: 'Glyphs',
		aria: 'Glyphs 09 Traitor',
		description: 'Betrayal by someone close and trusted; a weakening or loss of faith',
		back: false,
		value: 9,
		prophecy: {
			dmText:
				'The treasure is hidden in the master bedroom of the Wachterhaus (chapter 5, area N4o).',
			location: 'Town of Vallaki',
			playerText:
				'Look for a wealthy woman. A staunch ally of the devil, she keeps the treasure under lock and key, with the bones of an ancient enemy.',
		},
	},
	{
		id: 'priest',
		name: 'Priest',
		card: 'Master of Glyphs',
		deck: 'common',
		suit: 'Glyphs',
		aria: 'Glyphs 10 Priest',
		description: 'Enlightenment; those who follow a deity, a system of values, or a higher purpose',
		back: false,
		value: 10,
		prophecy: {
			dmText: 'The treasure lies in Castle Ravenloft’s chapel (chapter 4, area K15).',
			location: 'Castle Ravenloft',
			playerText:
				'You will find what you seek in the castle, amid the ruins of a place of supplication',
		},
	},
	{
		id: 'transmuter',
		name: 'Transmuter',
		card: 'One of Stars',
		deck: 'common',
		suit: 'Stars',
		aria: 'Stars 01 Transmuter',
		description:
			'A new discovery; the coming of unexpected things; unforeseen consequences and chaos',
		back: false,
		value: 1,
		prophecy: {
			dmText: 'The treasure lies in Castle Ravenloft’s north tower peak (chapter 4, area K60).',
			location: 'Castle Ravenloft',
			playerText: 'Go to a place of dizzying heights, where the stone itself is alive!',
		},
	},
	{
		id: 'diviner',
		name: 'Diviner',
		card: 'Two of Stars',
		deck: 'common',
		suit: 'Stars',
		aria: 'Stars 02 Diviner',
		description:
			'The pursuit of knowledge tempered by wisdom; truth and honesty; sages and prophecy',
		back: false,
		value: 2,
		prophecy: {
			dmText:
				'The treasure lies in Madam Eva’s encampment (chapter 2, area G). If she is the one performing the card reading, she says, "I think the treasure is under my very nose!"',
			location: 'Tser Pool Encampment',
			playerText: 'Look to the one who sees all. The treasure is hidden in her camp.',
		},
	},
	{
		id: 'enchanter',
		name: 'Enchanter',
		card: 'Three of Stars',
		deck: 'common',
		suit: 'Stars',
		aria: 'Stars 03 Enchanter',
		description: 'Inner turmoil that comes from confusion, fear of failure, or false information',
		back: false,
		value: 3,
		prophecy: {
			dmText:
				'The treasure lies under Marina’s monument in Berez (chapter 10, area U5). "The master of the marsh" refers to Burgomaster Lazlo Ulrich (area U2), whose ghost can point the characters toward the monument.',
			location: 'Ruins of Berez',
			playerText:
				'I see a kneeling woman - a rose of great beauty plucked too soon. The master of the marsh knows of whom I speak.',
		},
	},
	{
		id: 'abjurer',
		name: 'Abjurer',
		card: 'Four of Stars',
		deck: 'common',
		suit: 'Stars',
		aria: 'Stars 04 Abjurer',
		description:
			'Those guided by logic and reasoning; warns of an overlooked clue or piece of information',
		back: false,
		value: 4,
		prophecy: {
			dmText:
				'The treasure lies in the beacon of Argynvostholt (chapter 7, area Q53). "Great stone dragon" refers to the statue in area Q1.',
			location: 'Argynvostholt',
			playerText: 'I see a fallen house guarded by a great stone dragon. Look to the highest peak.',
		},
	},
	{
		id: 'elementalist',
		name: 'Elementalist',
		card: 'Five of Stars',
		deck: 'common',
		suit: 'Stars',
		aria: 'Stars 05 Elementalist',
		description:
			'The triumph of nature over civilization; natural disasters and bountiful harvests',
		back: false,
		value: 5,
		prophecy: {
			dmText:
				'The treasure is inside a model of Castle Ravenloft in the Amber Temple (chapter 13, area X20).',
			location: 'Amber Temple',
			playerText:
				'The treasure is hidden in a small castle beneath a mountain, guarded by amber giants.',
		},
	},
	{
		id: 'evoker',
		name: 'Evoker',
		card: 'Six of Stars',
		deck: 'common',
		suit: 'Stars',
		aria: 'Stars 06 Evoker',
		description:
			"Magical or supernatural power that can't be controlled; magic for destructive ends",
		back: false,
		value: 6,
		prophecy: {
			dmText:
				'The treasure is hidden in the crypt of Gralmore Nimblenobs (chapter 4, area K84, crypt 37).',
			location: 'Castle Ravenloft',
			playerText: 'Search for the crypt of the wizard ordinaire. His staff is the key.',
		},
	},
	{
		id: 'illusionist',
		name: 'Illusionist',
		card: 'Seven of Stars',
		deck: 'common',
		suit: 'Stars',
		aria: 'Stars 07 Illusionist',
		description:
			'Lies and deceit; grand conspiracies; secret societies; the presence of a dupe or a saboteur',
		back: false,
		value: 7,
		prophecy: {
			dmText: 'The treasure lies in Rictavio’s carnival wagon (chapter 5, area N5).',
			location: 'Town of Vallaki',
			playerText:
				'A man is not what he seems. He comes here in a carnival wagon. Therein lies what you seek.',
		},
	},
	{
		id: 'necromancer',
		name: 'Necromancer',
		card: 'Eight of Stars',
		deck: 'common',
		suit: 'Stars',
		aria: 'Stars 08 Necromancer',
		description: 'Unnatural events and unhealthy obsessions; those who follow a destructive path',
		back: false,
		value: 8,
		prophecy: {
			dmText: 'The treasure lies in Castle Ravenloft’s study (chapter 4, area K37).',
			location: 'Castle Ravenloft',
			playerText: 'A woman hangs above a roaring fire. Find her and you will find the treasure.',
		},
	},
	{
		id: 'conjurer',
		name: 'Conjurer',
		card: 'Nine of Stars',
		deck: 'common',
		suit: 'Stars',
		aria: 'Stars 09 Conjurer',
		description:
			'The coming of an unexpected supernatural threat; those who think of themselves as gods',
		back: false,
		value: 9,
		prophecy: {
			dmText: 'The treasure is in Baba Lysaga’s hut (chapter 10, area U3).',
			location: 'Ruins of Berez',
			playerText:
				'I see a dead village, drowned by a river, ruled by one who has brought great evil into the world.',
		},
	},
	{
		id: 'wizard',
		name: 'Wizard',
		card: 'Master of Stars',
		deck: 'common',
		suit: 'Stars',
		aria: 'Stars 10 Wizard',
		description:
			'Mystery and riddles; the unknown; those who crave magical power and great knowledge',
		back: false,
		value: 10,
		prophecy: {
			dmText: 'The treasure lies on the top floor of Van Richten’s Tower (chapter 11, area V7).',
			location: 'Town of Vallaki',
			playerText:
				'Look for a wizard’s tower on a lake. Let the wizard’s name and servant guide you to that which you seek.',
		},
	},
	{
		id: 'avenger',
		name: 'Avenger',
		card: 'One of Swords',
		deck: 'common',
		suit: 'Swords',
		aria: 'Swords 01 Avenger',
		description:
			'Justice and revenge for great wrongs; those on a quest to rid the world of great evil',
		back: false,
		value: 1,
		prophecy: {
			dmText:
				'The treasure is in the possession of Vladimir Horngaard in Argynvostholt (chapter 7, area Q36).',
			location: 'Argynvostholt',
			playerText: 'The treasure lies in a dragon’s house, in hands once clean and now corrupted.',
		},
	},
	{
		id: 'paladin',
		name: 'Paladin',
		card: 'Two of Swords',
		deck: 'common',
		suit: 'Swords',
		aria: 'Swords 02 Paladin',
		description: 'Just and noble warriors; those who live by a code of honor and integrity',
		back: false,
		value: 2,
		prophecy: {
			dmText: 'The treasure lies in Sergei’s tomb (chapter 4, area K85).',
			location: 'Castle Ravenloft',
			playerText:
				'I see a sleeping prince, a servant of the light and the brother of darkness. The treasure lies with him.',
		},
	},
	{
		id: 'soldier',
		name: 'Soldier',
		card: 'Three of Swords',
		deck: 'common',
		suit: 'Swords',
		aria: 'Swords 03 Soldier',
		description: 'War and sacrifice; the stamina to endure great hardship',
		back: false,
		value: 3,
		prophecy: {
			dmText:
				'The treasure lies on the rooftop of the Tsolenka Pass guard tower (chapter 9, area T6).',
			location: 'Tsolenka Pass',
			playerText: 'Go to the mountains. Climb the white tower guarded by golden knights.',
		},
	},
	{
		id: 'mercenary',
		name: 'Mercenary',
		card: 'Four of Swords',
		deck: 'common',
		suit: 'Swords',
		aria: 'Swords 04 Mercenary',
		description: 'Inner strength and fortitude; those who fight for power or wealth',
		back: false,
		value: 4,
		prophecy: {
			dmText: 'The treasure lies in a crypt in Castle Ravenloft (chapter 4, area K84, crypt 31).',
			location: 'Castle Ravenloft',
			playerText: 'The thing you seek lies with the dead, under mountains of gold coins.',
		},
	},
	{
		id: 'myrmidon',
		name: 'Myrmidon',
		card: 'Five of Swords',
		deck: 'common',
		suit: 'Swords',
		aria: 'Swords 05 Myrmidon',
		description:
			'Great heroes; a sudden reversal of fate; the triumph of the underdog over a mighty enemy',
		back: false,
		value: 5,
		prophecy: {
			dmText:
				'The treasure lies in the shrine of the Mother Night in the werewolf den (chapter 15, area Z7).',
			location: 'Werewolf Den',
			playerText:
				'Look for a den of wolves in the hills overlooking a mountain lake. The treasure belongs to Mother Night.',
		},
	},
	{
		id: 'berserker',
		name: 'Berserker',
		card: 'Six of Swords',
		deck: 'common',
		suit: 'Swords',
		aria: 'Swords 06 Berserker',
		description: 'The brutal and barbaric side of warfare; bloodlust; those with a bestial nature',
		back: false,
		value: 6,
		prophecy: {
			dmText:
				'The treasure lies in the crypt of General Kroval "Mad Dog" Grislek (chapter 4, area K84, crypt 38).',
			location: 'Castle Ravenloft',
			playerText:
				'Find the Mad Dog’s crypt. The treasure lies within, beneath the blackened bones.',
		},
	},
	{
		id: 'hooded-one',
		name: 'Hooded One',
		card: 'Seven of Swords',
		deck: 'common',
		suit: 'Swords',
		aria: 'Swords 07 Hooded One',
		description: 'Bigotry, intolerance, and xenophobia; a mysterious presence or newcomer',
		back: false,
		value: 7,
		prophecy: {
			dmText:
				'The treasure inside the head of a giant statue in the Amber Temple (chapter 13, area X5a).',
			location: 'Amber Temple',
			playerText:
				'I see a faceless god. He awaits you at the end of a long and winding road, deep in the mountains.',
		},
	},
	{
		id: 'dictator',
		name: 'Dictator',
		card: 'Eight of Swords',
		deck: 'common',
		suit: 'Swords',
		aria: 'Swords 08 Dictator',
		description:
			'All that is wrong with government and leadership; those who rule through fear and violence',
		back: false,
		value: 8,
		prophecy: {
			dmText: 'The treasure lies in Castle Ravenloft’s audience hall (chapter 4, area K25).',
			location: 'Castle Ravenloft',
			playerText: 'I see a throne fit for a king.',
		},
	},
	{
		id: 'torturer',
		name: 'Torturer',
		card: 'Nine of Swords',
		deck: 'common',
		suit: 'Swords',
		aria: 'Swords 09 Torturer',
		description:
			'The coming of suffering or merciless cruelty; one who is irredeemably evil or sadistic',
		back: false,
		value: 9,
		prophecy: {
			dmText:
				'The treasure is in the attic of the burgomaster’s mansion in Vallaki (chapter 5, area N3s).',
			location: 'Town of Vallaki',
			playerText:
				'There is a town where all is not well. There you will find a house of corruption, and within, a dark room full of still ghosts.',
		},
	},
	{
		id: 'warrior',
		name: 'Warrior',
		card: 'Master of Swords',
		deck: 'common',
		suit: 'Swords',
		aria: 'Swords 10 Warrior',
		description:
			'Strength and force personified; violence; those who use force to accomplish their goals',
		back: false,
		value: 10,
		prophecy: {
			dmText: 'The treasure lies in Strahd’s tomb (chapter 4, area K86).',
			location: 'Castle Ravenloft',
			playerText:
				'That which you seek lies in the womb of darkness, the devil’s "lair": the one place to which he must return.',
		},
	},
	{
		id: 'artifact',
		name: 'Artifact',
		card: 'The Artifact',
		deck: 'high',
		suit: 'High Deck',
		aria: 'High Deck Artifact',
		description:
			'The importance of some physical object that must be obtained, protected, or destroyed at all costs',
		back: false,
		prophecy: {
			allies: [
				{
					ally: 'Rictavio',
					playerText: 'Look for an entertaining man with a monkey. This man is more than he seems.',
					dmText:
						'This card refers to Rictavio (appendix D), who can be found at the Blue Water Inn, in Vallaki (chapter 5, area N2). Normally reluctant to accompany the characters, Rictavio changes his tune if the characters tell him about the card reading. He sheds his disguise and introduces himself as Dr. Rudolf van Richten.\n\nThe characters might think that Gadof Blinsky, the toymaker of Vallaki (area N7), is the figure they seek, because he has a pet monkey. If the speak to him about the possibility, Blinsky jokes that he and the monkey are "old friends," but if the characters ask him to come with them to fight Strahd, he politely declines. If the characters tell him about the tarokka reading, Blinsky admits that he acquired the monkey from a half-elf carnival ringmaster named Rictavio.',
				},
			],
			strahd: {
				playerText: 'He lurks in the darkness where the morning light once shone - a sacred place.',
				dmText: 'Strahd faces the characters in the chapel (area K15).',
			},
		},
	},
	{
		id: 'beast',
		name: 'Beast',
		card: 'The Beast',
		deck: 'high',
		suit: 'High Deck',
		aria: 'High Deck Beast',
		description:
			'Great rage or passion; something bestial or malevolent hiding in plain sight or lurking just below the surface',
		back: false,
		prophecy: {
			allies: [
				{
					ally: 'Zuleika Toranescu',
					playerText:
						'A werewolf holds a secret hatred for your enemy. Use her hatred to your advantage.',
					dmText:
						'This card refers to the werewolf Zuleika Toranescu (chapter 15, area Z7). She will accompany the characters if they promise to avenge her mate, Emil, by killing the leader of her pack, Kiril Stoyanovich.',
				},
			],
			strahd: {
				playerText: 'The beast sits on his dark throne.',
				dmText: 'Strahd faces the characters in the audience hall (area K25).',
			},
		},
	},
	{
		id: 'broken-one',
		name: 'Broken One',
		card: 'The Broken One',
		deck: 'high',
		suit: 'High Deck',
		aria: 'High Deck Broken One',
		description:
			'Defeat, failure, and despair; the loss of something or someone important, without which one feels incomplete',
		back: false,
		prophecy: {
			allies: [
				{
					ally: 'Mad Mage',
					playerText:
						'Your greatest ally will be a wizard. His mind is broken, but his spells are strong.',
					dmText: 'This card refers to the Mad Mage of Mount Baratok (chapter 2, area M).',
				},
				{
					ally: 'Donavich',
					playerText:
						'I see a man of faith whose sanity hangs by a thread. He has lost someone close to him.',
					dmText:
						'This card refers to Donavich, the priest in the village of Barovia (chapter 3, area E5). He will not accompany the characters until his son Doru, is dead and buried.',
				},
			],
			strahd: {
				playerText: 'He haunts the tomb of the man he envied above all.',
				dmText: 'Strahd faces the characters in Sergei’s tomb (area K86).',
			},
		},
	},
	{
		id: 'darklord',
		name: 'Darklord',
		card: 'The Darklord',
		deck: 'high',
		suit: 'High Deck',
		aria: 'High Deck Darklord',
		description:
			'A single, powerful individual of an evil nature, one whose goals have enormous and far-reaching consequences',
		back: false,
		prophecy: {
			allies: [
				{
					ally: 'No one',
					playerText: 'Ah, the worst of all "truths": You must face the evil of this land alone!',
					dmText: 'There is no NPC who can inspire the characters.',
				},
			],
			strahd: {
				playerText: 'He lurks in the depths of darkness, in the one place to which he must return.',
				dmText: 'Strahd faces the characters in his tomb (area K86).',
			},
		},
	},
	{
		id: 'donjon',
		name: 'Donjon',
		card: 'The Donjon',
		deck: 'high',
		suit: 'High Deck',
		aria: 'High Deck Donjon',
		description:
			"Isolation and imprisonment; being so conservative in thinking as to be a prisoner of one's own beliefs",
		back: false,
		prophecy: {
			allies: [
				{
					ally: 'Victor Vallakovich',
					playerText:
						'Search for a troubled young man surrounded by wealth and madness. His home is his prison',
					dmText:
						'This card refers to Victor Vallakovich (chapter 5, area N3t). Realizing that the characters are the key to his salvation, he enthusiastically leaves home and accompanies them to Castle Ravenloft.',
				},
				{
					ally: 'Stella Wachter',
					playerText:
						'Find a girl driven to insanity, locked in the heart of her dead father’s house. Curing her madness is key to your success.',
					dmText:
						'This card refers to Stella Wachter (chapter 5, area N4n). She grants the party no benefit unless her madness is cured. With her wits restored, Stella is happy to join the party and leave her rotten family behind.',
				},
			],
			strahd: {
				playerText: 'He lurks in a hall of bones, in the dark pits of his castle.',
				dmText: 'Strahd faces the characters in the hall of bones (area K67).',
			},
		},
	},
	{
		id: 'executioner',
		name: 'Executioner',
		card: 'The Executioner',
		deck: 'high',
		suit: 'High Deck',
		aria: 'High Deck Executioner',
		description:
			'The imminent death of one rightly or wrongly convicted of a crime; false accusations and unjust prosecution',
		back: false,
		prophecy: {
			allies: [
				{
					ally: 'Ismark Kolyanovich',
					playerText:
						'Seek out the brother of the devil’s bride. They call him "the lesser," but he has a powerful soul',
					dmText:
						'This card refers to Ismark Kolyanovich (chapter 3, area E2). Ismark won’t accompany the characters to Castle Ravenloft until he knows that his sister, Ireena Kolyana, is safe',
				},
			],
			strahd: {
				playerText:
					'I see a dark figure on a balcony, looking down upon this tortured land with a twisted smile.',
				dmText: 'Strahd faces the characters at the overlook (area K6).',
			},
		},
	},
	{
		id: 'ghost',
		name: 'Ghost',
		card: 'The Ghost',
		deck: 'high',
		suit: 'High Deck',
		aria: 'High Deck Ghost',
		description:
			'The looming past; the return of an old enemy or the discovery of a secret buried long ago',
		back: false,
		prophecy: {
			allies: [
				{
					ally: 'Sir Godfrey Gwilym',
					playerText:
						'I see a fallen paladin of the fallen order of knights. He lingers like a ghost in a dead dragon’s lair.',
					dmText:
						'This card refers to the revenant Sir Godfrey Gwilym (chapter 7, area Q37). Although initially unwilling to accompany the characters, he will do so if the characters convince him that the honor of the Order of the Silver Dragon can be restored with his help. Doing this requires a successful DC 15 Charisma (Persuasion) check.',
				},
				{
					ally: 'Sir Klutz',
					playerText:
						'Stir the spirit of the clumsy knight whose crypt lies deep within the castle.',
					dmText:
						'This card refers to Sir Klutz the phantom warrior (chapter 4, area K84, crypt 33). If Sir Klutz is Strahd’s enemy, then the phantom warrior disappears not after seven days, but only after he or Strahd is reduced to 0 hit points.',
				},
			],
			strahd: {
				playerText: 'Look to the father’s tomb.',
				dmText:
					'Strahd faces the characters in the tomb of King Barov and Queen Ravenovia (area K88).',
			},
		},
	},
	{
		id: 'horseman',
		name: 'Horseman',
		card: 'The Horseman',
		deck: 'high',
		suit: 'High Deck',
		aria: 'High Deck Horseman',
		description:
			'Death; disaster in the form of the loss of wealth or property, a horrible defeat, or the end of a bloodline',
		back: false,
		prophecy: {
			allies: [
				{
					ally: 'Nikolai Wachter',
					playerText:
						'I see a dead man of noble birth, guarded by his widow. Return to life the dead man’s corpse, and he will be your staunch ally.',
					dmText:
						'This card refers to Nikolai Wachter the elder, who is dead (chapter 5, area N4o). If the characters cast a raise dead spell or a resurrection spell on his preserved corpse, Nikokai (LN male human noble) agrees to help the characters once he feels well enough, despite his wife’s protests. Although his family has long supported Strahd, Nikolai came to realize toward the end of his life that Strahd must be destroyed to save Barovia.\n\nIf the characters don’t have the means to raise Nikolai from the dead, Rictavio (appendix D) gives them a spell scroll of raise dead if he learns of their need. If they’re staying at the Blue Water Inn, he leaves the scroll in one of their rooms.',
				},
				{
					ally: 'Arrigal',
					playerText:
						'A man of death named Arrigal will forsake his dark lord to serve your cause. Beware! He has a rotten soul.',
					dmText:
						'This card refers to the Vistani assassin Arrigal (chapter 5, area N9c). If the characters mention this card reading to him he accepts his fate and accompanies them. If the characters succeed in defeating Strahd, Arrigal betrays and attacks them, believing that he is destined to become Barovia’s new lord.',
				},
			],
			strahd: {
				playerText: 'He lurks in the one place to which he must return - a place of death.',
				dmText: 'Strahd faces the characters in his tomb (area K86).',
			},
		},
	},
	{
		id: 'innocent',
		name: 'Innocent',
		card: 'The Innocent',
		deck: 'high',
		suit: 'High Deck',
		aria: 'High Deck Innocent',
		description:
			'A being of great importance whose life is in danger (who might be helpless or simply unaware of the peril)',
		back: false,
		prophecy: {
			allies: [
				{
					ally: 'Parriwimple',
					playerText:
						'I see a young man with a kind heart. A mother’s boy! He is strong in body but weak of mind. Seek him out in the village of Barovia.',
					dmText:
						'This card refers to Parriwimple (see chapter 3, area E1). Although he’s a simpleton, he won’t travel to Castle Ravenloft without good cause. Characters can manipulate him into going by preying on his good heart. For instance, he might go there to help rescue missing Barovians, or to save the life of Ireena Kolyana, who is very beautiful. The characters must somehow deal with Bildrath, Parriwimple’s employer, who won’t let the foolish boy go to the castle for any reason.',
				},
				{
					ally: 'Ireena Kolyana',
					playerText: 'Evil’s bride is the one you seek!',
					dmText:
						'This card refers to Ireena Kolyana (chapter 3, area E4). Her brother Ismark, opposes the idea of Ireena’s being taken to Castle Ravenloft, but he insists on going there once the characters tell her about the card reading. Ireena won’t accompany the characters however, until Kolyan Indirovich’s body is laid to rest in the cemetery.',
				},
			],
			strahd: {
				playerText:
					'He dwells with the one whose blood sealed his doom, a brother of light snuffed out too soon.',
				dmText: 'Strahd faces the characters in Sergei’s tomb (area K85).',
			},
		},
	},
	{
		id: 'marionette',
		name: 'Marionette',
		card: 'The Marionette',
		deck: 'high',
		suit: 'High Deck',
		aria: 'High Deck Marionette',
		description:
			'The presence of a spy or a minion of some greater power; an encounter with a puppet or an underling',
		back: false,
		prophecy: {
			allies: [
				{
					ally: 'Pidlwick II',
					playerText:
						'What horror is this? I see a man made by a man. Ageless and alone, it haunts the towers of the castle.',
					dmText: 'This card refers to Pidlwick II (chapter 4, area K59 & appendix D)',
				},
				{
					ally: 'Cloven Belview',
					playerText:
						'Look for a man of music, a man with two heads. He lives in a place of great hunger and sorrow.',
					dmText:
						'This card refers to Cloven Belview (chapter 8, area S17), the two-headed mongrelfolk. Clovin serves the Abbot out of fear and perverse sense of loyalty. His job is to deliver food to the other mongrelfolk, whom he abhors. If abbot still lives, Clovin doesn’t want to earn the master’s ire by attempting to leave, and he refuses to accompany the characters. But if the Abbot dies, Clovin doesn’t have any reason to remain in the abbey, so he’s willing to come along if he is bribed with wine. Clovin provides no benefit to the party without his Viol.',
				},
			],
			strahd: {
				playerText: 'Look to great heights. Find the beating heart of the castle. He waits nearby.',
				dmText: 'Strahd faces the characters in the north tower peak (area K60).',
			},
		},
	},
	{
		id: 'mists',
		name: 'Mists',
		card: 'The Mists',
		deck: 'high',
		suit: 'High Deck',
		aria: 'High Deck Mists',
		description:
			"Something unexpected or mysterious that can't be avoided; a great quest or journey that will try one's spirit",
		back: false,
		prophecy: {
			allies: [
				{
					ally: 'Ezmerelda d’Avenir',
					playerText:
						'A vistana wanders this land alone, searching for her mentor. She does not stay in one place for long. Seek her out at Saint Markovia’s abbey, near the mists.',
					dmText:
						'This card refers to Ezmerelda d’Avenir (appendix D). She can be found in the Abbey of Saint Markovia (see chapter 8, area S19) as well as several other locations throughout Barovia.',
				},
			],
			strahd: {
				playerText: 'The cards can’t see where the evil lurks. The mists obscure all.',
				dmText:
					'This card offers no clue about where the final showdown with Strahd will occur. It can happen anywhere you like in Castle Ravenloft. Alternatively, Madam Eva tells the characters to return to her after at least three days, and she will consult the cards again for them, but only to discern the location of their enemy.',
			},
		},
	},
	{
		id: 'raven',
		name: 'Raven',
		card: 'The Raven',
		deck: 'high',
		suit: 'High Deck',
		aria: 'High Deck Raven',
		description:
			'A hidden source of information; a fortunate turn of events; a secret potential for good',
		back: false,
		prophecy: {
			allies: [
				{
					ally: 'Davian Martikov',
					playerText:
						'Find the leader of the feathered ones who live among the vines. Though old, he has one more fight left in him.',
					dmText:
						'This card refers to Davian Martikov (chapter 12, "The Wizard of the Wines"). The old wereraven, realizing that he has a chance to end Strahd’s tyranny, leaves his vineyard and winery in the capable hands of his sons, Adrian and Elvir. But before he travels to Castle Ravenloft to face Strahd, Davian insists on reconciling with his third son, Urwin Martikov (chapter 5, area N2).',
				},
			],
			strahd: {
				playerText: 'Look to the mother’s tomb.',
				dmText:
					'Strahd faces the characters in the tomb of King Barov and Queen Ravenovia (area K88).',
			},
		},
	},
	{
		id: 'seer',
		name: 'Seer',
		card: 'The Seer',
		deck: 'high',
		suit: 'High Deck',
		aria: 'High Deck Seer',
		description:
			'Inspiration and keen intellect; a future event, the outcome of which will hinge on a clever mind',
		back: false,
		prophecy: {
			allies: [
				{
					ally: 'Kasimir Velikov',
					playerText:
						'Look for a dusk elf living among the Vistani. He has suffered a great loss and is haunted by dark dreams. Help him, and he will help you in return.',
					dmText:
						'This card refers to Kasimir Velikov (chapter 5, area N9a). The dusk elf accompanies the characters to Castle Ravenloft only after they lead him to the Amber Temple and find the means to resurrect his dead sister, Patrina Velikovna.',
				},
			],
			strahd: {
				playerText:
					'He waits for you in a place of wisdom, warmth, and despair. Great secrets are there.',
				dmText: 'Strahd faces the characters in the study (area K37).',
			},
		},
	},
	{
		id: 'tempter',
		name: 'Tempter',
		card: 'The Tempter',
		deck: 'high',
		suit: 'High Deck',
		aria: 'High Deck Tempter',
		description:
			'One who has been compromised or led astray by temptation or foolishness; one who tempts others for evil ends',
		back: false,
		prophecy: {
			allies: [
				{
					ally: 'Arabelle',
					playerText:
						'I see a child - a Vistana. You must hurry, for her fate hangs in the balance. Find her at the lake!',
					dmText:
						'This card refers to Arabelle (chapter 2, area L). She gladly joins the party. But if she returns to her camp (chapter 5, area N9), her father Luvash, refuses to let her leave.',
				},
				{
					ally: 'Vasilka',
					playerText:
						'I hear a wedding bell, or perhaps a death knell. It calls the to a mountainside abbey, wherein you will find a woman who is more than the sum of her parts.',
					dmText: 'This card refers to Vasilka, the flesh golem (chapter 8, area S13).',
				},
			],
			strahd: {
				playerText:
					'I see a secret place - a vault of temptation hidden behind a woman of great beauty. The evil waits atop his tower of treasure.',
				dmText:
					'Strahd confronts the characters in the treasury (area K41). "A woman of great beauty" refers to the portrait of Tatyana hanging in the castle’s study (area K37), which contains a secret door that leads to the treasury.',
			},
		},
	},
];

export default tarokkaCards;
