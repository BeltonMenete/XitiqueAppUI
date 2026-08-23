// Design System Configuration for Xitique App
// Cold Slate Theme with Emerald Accents

export const colors = {
	// Primary (Cold Slate)
	primary: {
		DEFAULT: "#475569", // slate-600
		light: "#64748b", // slate-500
		dark: "#334155", // slate-700
		darker: "#1e293b", // slate-800
	},

	// Secondary (Emerald - accent) - Lightened
	secondary: {
		DEFAULT: "#10b981", // emerald-500 (lightened from emerald-600)
		light: "#34d399", // emerald-400
		dark: "#059669", // emerald-600 (lightened from emerald-700)
		darker: "#047857", // emerald-700 (lightened from emerald-800)
	},

	// Tertiary (Blue - new accent color #3391C2)
	tertiary: {
		DEFAULT: "#3391C2", // Primary blue
		light: "#4AA3D0", // Light blue
		dark: "#2A7A9E", // Dark blue
		lighter: "#6BB4DD", // Lighter blue
		darker: "#1F637E", // Darker blue
	},

	// Backgrounds
	background: {
		primary: "#f8fafc", // slate-50
		secondary: "#f1f5f9", // slate-100
		tertiary: "#e2e8f0", // slate-200
		white: "#ffffff",
	},

	// Status Colors
	status: {
		success: "#10b981", // emerald-500
		warning: "#f59e0b", // amber-500
		error: "#ef4444", // red-500
		info: "#3b82f6", // blue-500
		inactive: "#3391C2", // new blue for inactive status
	},

	// Text Colors
	text: {
		primary: "#0f172a", // slate-900
		secondary: "#475569", // slate-600
		tertiary: "#94a3b8", // slate-400
		inverse: "#ffffff",
	},

	// Border Colors
	border: {
		DEFAULT: "#e2e8f0", // slate-200
		light: "#f1f5f9", // slate-100
		dark: "#cbd5e1", // slate-300
	},
};

export const typography = {
	fonts: {
		display: "Montserrat, sans-serif",
		body: "Inter, sans-serif",
		mono: "JetBrains Mono, monospace",
	},

	sizes: {
		// Display sizes
		displayHero: "40px",
		displayLarge: "32px",
		displayMedium: "24px",

		// Body sizes
		bodyLarge: "18px",
		bodyMedium: "16px",
		bodySmall: "14px",

		// Label sizes
		labelMedium: "12px",
		labelSmall: "10px",

		// Data sizes
		data: "14px",
	},

	weights: {
		light: "300",
		normal: "400",
		medium: "500",
		semibold: "600",
		bold: "700",
		extrabold: "800",
	},

	lineHeights: {
		tight: "1.2",
		normal: "1.5",
		relaxed: "1.75",
	},
};

export const spacing = {
	// Base unit: 4px
	xs: "4px",
	sm: "8px",
	md: "16px",
	lg: "24px",
	xl: "32px",
	"2xl": "48px",
	"3xl": "64px",

	// Functional spacing
	section: "24px",
	card: "20px",
	input: "12px",
};

export const borderRadius = {
	sm: "4px",
	DEFAULT: "8px",
	md: "12px",
	lg: "16px",
	xl: "24px",
	full: "9999px",
};

export const shadows = {
	sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
	DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
	md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
	lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
	xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
};

export const transitions = {
	fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
	normal: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
	slow: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
};

export const zIndex = {
	dropdown: 1000,
	sticky: 1020,
	modal: 1050,
	tooltip: 1060,
	notification: 1070,
};

// Tailwind class mappings for consistent usage
export const tailwindClasses = {
	// Background colors
	bgPrimary: "bg-slate-50",
	bgSecondary: "bg-slate-100",
	bgTertiary: "bg-slate-200",
	bgWhite: "bg-white",

	// Text colors
	textPrimary: "text-slate-900",
	textSecondary: "text-slate-600",
	textTertiary: "text-slate-400",

	// Border colors
	border: "border-slate-200",
	borderLight: "border-slate-100",

	// Status colors
	success: "text-emerald-500 bg-emerald-50 border-emerald-200",
	warning: "text-amber-500 bg-amber-50 border-amber-200",
	error: "text-red-500 bg-red-50 border-red-200",
	info: "text-blue-500 bg-blue-50 border-blue-200",
	inactive: "text-[#3391C2] bg-[#3391C2]/10 border-[#3391C2]/20",

	// Button variants
	buttonPrimary: "bg-emerald-500 text-white hover:bg-emerald-600",
	buttonSecondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
	buttonDanger: "bg-red-500 text-white hover:bg-red-600",
	buttonGhost: "bg-transparent text-slate-600 hover:bg-slate-100",
	buttonOutline: "border border-slate-300 text-slate-700 hover:bg-slate-50",
	buttonInactive: "bg-[#3391C2] text-white hover:bg-[#2A7A9E]",

	// Card styles
	card: "bg-white border border-slate-200 rounded-lg shadow-sm",
	cardInteractive:
		"bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow",

	// Input styles
	input:
		"bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500",

	// Typography
	display: "font-display font-bold",
	heading: "font-display font-semibold",
	body: "font-body font-normal",
	label: "font-body font-semibold text-xs uppercase tracking-wider",
	mono: "font-mono font-medium",
};

// Helper function for conditional classes
export function cn(...classes: (string | undefined | null | false)[]): string {
	return classes.filter(Boolean).join(" ");
}

// Status type for type-safe status handling
export type StatusType =
	| "success"
	| "warning"
	| "error"
	| "info"
	| "pending"
	| "active"
	| "inactive"
	| "debt";

export function getStatusColor(status: StatusType): string {
	switch (status) {
		case "success":
		case "active":
			return tailwindClasses.success;
		case "warning":
		case "pending":
			return tailwindClasses.warning;
		case "error":
		case "debt":
			return tailwindClasses.error;
		case "inactive":
			return tailwindClasses.inactive;
		case "info":
			return tailwindClasses.info;
		default:
			return tailwindClasses.buttonSecondary;
	}
}

// Button variant types
export type ButtonVariant =
	| "primary"
	| "secondary"
	| "danger"
	| "ghost"
	| "outline"
	| "inactive";

export function getButtonVariant(variant: ButtonVariant): string {
	switch (variant) {
		case "primary":
			return tailwindClasses.buttonPrimary;
		case "secondary":
			return tailwindClasses.buttonSecondary;
		case "danger":
			return tailwindClasses.buttonDanger;
		case "ghost":
			return tailwindClasses.buttonGhost;
		case "outline":
			return tailwindClasses.buttonOutline;
		case "inactive":
			return tailwindClasses.buttonInactive;
		default:
			return tailwindClasses.buttonPrimary;
	}
}
