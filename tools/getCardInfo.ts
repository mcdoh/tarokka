import { isHighCard, isLowCard } from '@/tools/cardTypes';
import { Layout, Settings, TarokkaGameCard } from '@/types';

export default function getTooltip(
	card: TarokkaGameCard,
	position: Layout,
	dm: boolean,
	settings: Settings,
) {
	const { card: cardName, description, flipped } = card;

	let text: string[] = [];

	if (flipped) {
		if (dm || settings.positionFront) text.push(position.text);

		if (dm) text.push(`${cardName}: ${description}`);

		if (isHighCard(card)) {
			// High deck ally
			if (position.id === 'ally') {
				if (dm) text.push(`Ally: ${card.prophecy.allies[0].ally}`);
				if (dm) text.push(card.prophecy.allies[0].dmText);
				if (dm || settings.prophecy) text.push(card.prophecy.allies[0].playerText);
			}

			// High deck Strahd
			if (position.id === 'strahd') {
				if (dm) text.push(card.prophecy.strahd.dmText);
				if (dm || settings.prophecy) text.push(card.prophecy.strahd.playerText);
			}
		}

		// Low deck: Tome, Ravenkind, or Sunsword
		if (isLowCard(card)) {
			if (dm) text.push(card.prophecy.dmText);
			if (dm || settings.prophecy) text.push(card.prophecy.playerText);
		}
	} else {
		if (dm || settings.positionBack) text.push(position.text);
	}

	return text;
}
