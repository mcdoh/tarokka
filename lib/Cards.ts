import getRandomItems from '../tools/getRandomItems';
import cards from '../const/cards';
import type { CardImage } from '@/types';

export interface Options {
  back: number;
  jokers: boolean;
}

export interface OptionProps {
  back?: number;
  jokers?: boolean;
}

const DEFAULT_OPTIONS = {
  jokers: false,
  back: 1,
};

export default class Cards {
  private options: Options;

  private deck: CardImage[] = [];
  private backs: CardImage[] = [];
  private jokers: CardImage[] = [];


  constructor(options: OptionProps = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };

    this.deck = cards.filter(card => !card.back && (this.options.jokers || !card.joker));
    this.backs = cards.filter(card => card.back);
    this.jokers = cards.filter(card => card.joker);
  }

  select(count: number): CardImage[] {
    return getRandomItems(this.deck, count);
  }

  getBack(style: number): CardImage {
    style = style || this.options.back;
    return this.backs.find(card => card.id.startsWith(String(style))) || this.backs[0];
  }

  getJokers(): CardImage[] {
    return this.jokers;
  }
}
