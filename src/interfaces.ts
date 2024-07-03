import { CookType, Topping } from './enums';

export interface Order {
  numPancakes: number;
  cookType: CookType;
  topping?: Topping;
  sauce?: string;
}

export interface OrderMessage {
  message: string;
  order: Order;
}

export interface ConversationMessage {
  speaker: string;
  message: string;
}

const orders: { [key: string]: Order } = {
  plain: {
    numPancakes: 1,
    cookType: CookType.COOKED,
  },
  original: {
    numPancakes: 1,
    cookType: CookType.COOKED,
    topping: Topping.BUTTER,
  },
  double: {
    numPancakes: 2,
    cookType: CookType.COOKED,
  },
  berry: {
    numPancakes: 1,
    cookType: CookType.COOKED,
    topping: Topping.BERRIES,
  },
};

const messages: OrderMessage[] = [
  {
    message: "I'll have a pancake with just butter please!",
    order: orders['plain'],
  },
];

const introConversation: ConversationMessage[] = [
  {
    speaker: 'Player',
    message: 'Welcome!',
  },
  {
    speaker: 'Kai',
    message:
      'Hey! I saw the soft opening sign and wanted to check this place out.',
  },
  {
    speaker: 'Kai',
    message:
      "I've never had a souffle pancake before...what does it taste like?",
  },
  {
    speaker: 'Player',
    message:
      "I've never had a souffle pancake before...what does it taste like?",
  },
  {
    speaker: 'Player',
    message:
      "It's fluffier and softer than a normal pancake. It also just melts in your mouth",
  },
  {
    speaker: 'Kai',
    message: "Wow sounds amazing...I'll try one with butter",
  },
];
