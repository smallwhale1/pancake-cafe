export enum CookType {
  UNCOOKED,
  HALF,
  COOKED,
  TOASTY,
}

export enum Topping {
  BUTTER,
  BERRIES,
  MANGO,
}

export enum Tool {
  BATTER,
  BUTTER,
  SPATULA,
}

export enum PancakeState {
  STOVE,
  STACKING,
  PLATING,
}

export type ToppingToSrc = {
  [key in Topping]: string;
};
export const toppingImages: ToppingToSrc = {
  [Topping.BUTTER]: '',
  [Topping.BERRIES]: '',
  [Topping.MANGO]: '',
};
