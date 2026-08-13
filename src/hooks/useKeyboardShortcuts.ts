import { useEffect } from "react";

interface Shortcut {
	key: string;
	handler: () => void;
	description?: string;
	preventDefault?: boolean;
}

export function useKeyboardShortcuts(shortcuts: Shortcut[]) {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			for (const shortcut of shortcuts) {
				const keyParts = shortcut.key.split("+");
				const ctrlKey = keyParts.includes("Ctrl") || keyParts.includes("cmd");
				const shiftKey = keyParts.includes("Shift");
				const mainKey = keyParts[keyParts.length - 1].toLowerCase();

				if (
					event.ctrlKey === ctrlKey &&
					event.shiftKey === shiftKey &&
					event.key.toLowerCase() === mainKey
				) {
					if (shortcut.preventDefault) {
						event.preventDefault();
					}
					shortcut.handler();
					break;
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [shortcuts]);
}

export const commonShortcuts: Shortcut[] = [
	{
		key: "Ctrl+k",
		handler: () => console.log("Search focused"),
		description: "Abrir busca",
		preventDefault: true,
	},
	{
		key: "Ctrl+/",
		handler: () => console.log("Help opened"),
		description: "Abrir ajuda",
		preventDefault: true,
	},
	{
		key: "Escape",
		handler: () => console.log("Modal closed"),
		description: "Fechar modal",
		preventDefault: true,
	},
];
