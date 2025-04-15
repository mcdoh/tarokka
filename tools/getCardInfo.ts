import { isHighCard, isLowCard } from '@/tools/cardTypes';
import { Layout, TarokkaGameCard } from '@/types';

export default function getTooltip(card: TarokkaGameCard, position: Layout, dm: boolean) {
	const { card: cardName, description, flipped } = card;

	let text: string[] = [position.text];

	if (flipped) {
		if (dm) text.push(`${cardName}: ${description}`);

		if (isHighCard(card)) {
			// High deck ally
			if (position.id === 'ally') {
				if (dm) text.push(`Ally: ${card.prophecy.allies[0].ally}`);
				if (dm) text.push(card.prophecy.allies[0].dmText);
				text.push(card.prophecy.allies[0].playerText);
			}

			// High deck Strahd
			if (position.id === 'strahd') {
				if (dm) text.push(card.prophecy.strahd.dmText);
				text.push(card.prophecy.strahd.playerText);
			}
		}

		// Low deck Tome, Ravenkind, or Sunsword
		if (isLowCard(card)) {
			if (dm) text.push(card.prophecy.dmText);
			text.push(card.prophecy.playerText);
		}
	}

	return text;
}
