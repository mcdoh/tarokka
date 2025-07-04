import { isHighCard, isLowCard } from '@/tools';
import { Layout, Settings, TarokkaGameCard } from '@/types';

export const getCardInfo = (
	card: TarokkaGameCard,
	position: Layout,
	dm: boolean,
	settings: Settings,
) => {
	const { card: cardName, description, flipped } = card;

	let text: string[] = [];

	if (dm || flipped) {
		if (dm || settings.positionFront) text.push(position.text);

		if (dm) text.push(`${cardName}: ${description}`);

		if (isHighCard(card)) {
			// High deck ally
			if (position.id === 'ally') {
				if (dm || settings.prophecy) text.push(card.prophecy.allies[0].playerText);
				if (dm) text.push(card.prophecy.allies[0].dmText);
				if (dm) text.push(`Ally: ${card.prophecy.allies[0].ally}`);
			}

			// High deck Strahd
			if (position.id === 'strahd') {
				if (dm || settings.prophecy) text.push(card.prophecy.strahd.playerText);
				if (dm) text.push(card.prophecy.strahd.dmText);
			}
		}

		// Low deck: Tome, Ravenkind, or Sunsword
		if (isLowCard(card)) {
			if (dm || settings.prophecy) text.push(card.prophecy.playerText);
			if (dm) text.push(card.prophecy.dmText);
		}
	}

	return text;
};
