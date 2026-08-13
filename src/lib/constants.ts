export const APP_NAME = "XITIQUE";
export const APP_TAGLINE =
	"Poupança digital, gestão simples e confiança para todos.";
export const LOGIN_SUBMIT_DELAY = 1500;

export const ANIMATION_DURATION = {
	FAST: 0.08,
	NORMAL: 0.1,
	SLOW: 0.15,
	VERY_SLOW: 1.2,
} as const;

export const UI_SIZES = {
	CARD_RADIUS: "rounded-2xl",
	PANEL_RADIUS: "rounded-3xl",
	INPUT_HEIGHT: "py-3.5",
} as const;

export const FEATURE_FLAGS = {
	DASHBOARD: true,
	SAVINGS: true,
	PAYMENTS: true,
} as const;
