import getRandomItems from '../tools/getRandomItems';
import cards from '../constants/tarokkaCards';
import type { TarokkaCard } from '../types';

export default class TarokkaDeck {
  private deck: TarokkaCard[] = [];
  private backs: TarokkaCard[] = [];

  constructor() {
    this.deck = cards.filter(card => !card.back);
    this.backs = cards.filter(card => card.back);
  }

  select(count: number): TarokkaCard[] {
    return getRandomItems(this.deck, count);
  }

  getBack(): TarokkaCard {
    return this.backs[0];
  }
}
