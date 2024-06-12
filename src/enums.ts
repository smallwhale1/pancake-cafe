export enum CookType {
  UNCOOKED,
  COOKED,
  TOASTY,
}

export enum Topping {
  BUTTER,
  BERRIES,
  MANGO,
}

export type ToppingToSrc = {
  [key in Topping]: string;
};
export const toppingImages: ToppingToSrc = {
  [Topping.BUTTER]: '',
  [Topping.BERRIES]: '',
  [Topping.MANGO]: '',
};
