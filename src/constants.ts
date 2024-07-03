// Colors
export const BACKGROUND_COLOR = '#fff4e3';

// Image Paths
export const UNCOOKED_PANCAKE_SRC =
  'assets/kitchen/pancakes/uncooked-pancake.png';
export const HALF_COOKED_PANCAKE_SRC =
  'assets/kitchen/pancakes/half-cooked-pancake.png';
export const COOKED_PANCAKE_SRC = 'assets/kitchen/pancakes/cooked-pancake.png';
export const TOASTY_PANCAKE_SRC = 'assets/kitchen/pancakes/toasty-pancake.png';
export const BUTTER_SRC = 'assets/kitchen/toppings/butter.png';
export const SPATULA_IDLE = 'assets/kitchen/tools/spatula_idle.png';
export const SPATULA_ACTIVE = 'assets/kitchen/tools/spatula_active.png';

// characters
export const KAI_SRC = 'assets/characters/kai_downsized.png';

// each tile in the scene
export const TILE_SIZE = 64;

// Dimensions
export const PADDING = 24;

// Spatula
export const SPATULA_AR = 500 / 380;
export const SPATULA_WIDTH = TILE_SIZE * 2.25;
export const SPATULA_HEIGHT = SPATULA_WIDTH * (1 / SPATULA_AR);
export const SPATULA_START_X = PADDING;
export const SPATULA_START_Y = PADDING;

export const BATTER_WIDTH = TILE_SIZE * 2.25;
export const BATTER_START_X = PADDING;
export const BATTER_START_Y = PADDING + SPATULA_HEIGHT;

export const PANCAKE_AR = 465 / 365;
export const PANCAKE_START_X = BATTER_START_X + BATTER_WIDTH + PADDING * 2;
export const PANCAKE_START_Y = PADDING * 2;

export const PANCAKE_WIDTH = 125;
export const PANCAKE_HEIGHT = PANCAKE_WIDTH * (1 / PANCAKE_AR);

export const PANCAKE_STACK_OFFSET = PANCAKE_HEIGHT - 50;

export const STOVE_WIDTH = (PANCAKE_WIDTH + PADDING) * 3 + PADDING;
export const STOVE_HEIGHT = (PANCAKE_HEIGHT + PADDING) * 2 + PADDING;
export const STOVE_START_X = BATTER_START_X + BATTER_WIDTH + PADDING;
export const STOVE_START_Y = PADDING;

export const BATTER_HEIGHT = STOVE_HEIGHT - SPATULA_HEIGHT;

export const STACK_PLATE_WIDTH = PANCAKE_WIDTH + PADDING + PADDING;
export const STACK_PLATE_HEIGHT = 100;
export const STACK_PLATE_START_X = STOVE_START_X + STOVE_WIDTH + PADDING;
export const STACK_PLATE_START_Y =
  STOVE_START_Y + STOVE_HEIGHT - STACK_PLATE_HEIGHT;

export const PLATE_WIDTH = PANCAKE_WIDTH + PADDING + PADDING;
export const HEIGHT = 100;
export const PLATE_START_X = STACK_PLATE_START_X + STACK_PLATE_WIDTH + PADDING;
export const PLATE_START_Y = STOVE_START_Y + STOVE_HEIGHT - STACK_PLATE_HEIGHT;

export const BUTTER_AR = 252 / 173;
export const BUTTER_WIDTH = 60;
export const BUTTER_HEIGHT = BUTTER_WIDTH * (1 / BUTTER_AR);

export const BUTTER_X_OFFSET = PANCAKE_WIDTH / 2 - BUTTER_WIDTH / 2;
export const BUTTER_Y_OFFSET = 7;

export const PROGRESS_BAR_HEIGHT = 6;
export const PROGRESS_BAR_Y_OFFSET = 20;

export const COOK_TIME = 5000;
export const OVER_COOK_TIME = 8000;

export const SERVE_BTN_WIDTH = PLATE_WIDTH;
export const SERVE_BTN_X = STACK_PLATE_START_X + STACK_PLATE_WIDTH + PADDING;
export const SERVE_BTN_Y = STOVE_START_Y + STOVE_HEIGHT + PADDING;

// Characters

export const KAI_AR = 500 / 693;
export const KAI_HEIGHT = 500;
export const KAI_WIDTH = KAI_HEIGHT * KAI_AR;
export const CHARACTER_X = PADDING;
export const CHARACTER_Y = TILE_SIZE;
