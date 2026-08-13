import { useEffect } from "react";

interface Shortcut {
	key: string;
	ctrl?: boolean;
	shift?: boolean;
	alt?: boolean;
	meta?: boolean;
	description: string;
	action: () => void;
	category?: "navigation" | "actions" | "editing" | "general";
}

interface KeyboardShortcutsProps {
	shortcuts: Shortcut[];
	enabled?: boolean;
}

export function useKeyboardShortcuts({
	shortcuts,
	enabled = true,
}: KeyboardShortcutsProps) {
	useEffect(() => {
		if (!enabled) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			const shortcut = shortcuts.find((s) => {
				const keyMatch = s.key.toLowerCase() === event.key.toLowerCase();
				const ctrlMatch = (s.ctrl || false) === event.ctrlKey;
				const shiftMatch = (s.shift || false) === event.shiftKey;
				const altMatch = (s.alt || false) === event.altKey;
				const metaMatch = (s.meta || false) === event.metaKey;

				return keyMatch && ctrlMatch && shiftMatch && altMatch && metaMatch;
			});

			if (shortcut) {
				event.preventDefault();
				shortcut.action();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [shortcuts, enabled]);
}

// Keyboard Shortcuts Modal Component
interface KeyboardShortcutsModalProps {
	isOpen: boolean;
	onClose: () => void;
	shortcuts: Shortcut[];
}

export function KeyboardShortcutsModal({
	isOpen,
	onClose,
	shortcuts,
}: KeyboardShortcutsModalProps) {
	const categories = {
		navigation: "Navegação",
		actions: "Acções",
		editing: "Edição",
		general: "Geral",
	};

	const groupedShortcuts = shortcuts.reduce(
		(acc, shortcut) => {
			const category = shortcut.category || "general";
			if (!acc[category]) {
				acc[category] = [];
			}
			acc[category].push(shortcut);
			return acc;
		},
		{} as Record<string, Shortcut[]>,
	);

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isOpen ? "block" : "hidden"}`}
		>
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-background-secondary/80 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* Modal */}
			<div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden animate-in scale-in duration-200">
				{/* Header */}
				<div className="flex items-center justify-between px-6 py-4 border-b border-border">
					<h2 className="text-lg font-semibold text-text-primary">
						Atalhos de Teclado
					</h2>
					<button
						onClick={onClose}
						className="p-2 hover:bg-background-secondary rounded-lg transition-colors text-text-secondary hover:text-text-primary"
					>
						<span className="sr-only">Fechar</span>
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				{/* Content */}
				<div className="p-6 overflow-y-auto max-h-[60vh]">
					{Object.entries(groupedShortcuts).map(
						([category, categoryShortcuts]) => (
							<div key={category} className="mb-6">
								<h3 className="text-sm font-semibold text-text-primary mb-3">
									{categories[category as keyof typeof categories] || category}
								</h3>
								<div className="space-y-2">
									{categoryShortcuts.map((shortcut, index) => (
										<div
											key={index}
											className="flex items-center justify-between p-3 bg-background-secondary rounded-lg"
										>
											<span className="text-sm text-text-primary">
												{shortcut.description}
											</span>
											<div className="flex items-center gap-1">
												{shortcut.ctrl && (
													<kbd className="px-2 py-1 bg-white border border-border rounded text-xs font-mono">
														Ctrl
													</kbd>
												)}
												{shortcut.shift && (
													<kbd className="px-2 py-1 bg-white border border-border rounded text-xs font-mono">
														Shift
													</kbd>
												)}
												{shortcut.alt && (
													<kbd className="px-2 py-1 bg-white border border-border rounded text-xs font-mono">
														Alt
													</kbd>
												)}
												{shortcut.meta && (
													<kbd className="px-2 py-1 bg-white border border-border rounded text-xs font-mono">
														⌘
													</kbd>
												)}
												<kbd className="px-2 py-1 bg-white border border-border rounded text-xs font-mono font-bold">
													{shortcut.key.toUpperCase()}
												</kbd>
											</div>
										</div>
									))}
								</div>
							</div>
						),
					)}
				</div>

				{/* Footer */}
				<div className="px-6 py-4 border-t border-border bg-background-primary">
					<p className="text-xs text-text-tertiary">
						Pressione{" "}
						<kbd className="px-1.5 py-0.5 bg-white border border-border rounded text-[10px] font-mono">
							?
						</kbd>{" "}
						para abrir este painel
					</p>
				</div>
			</div>
		</div>
	);
}

// Default shortcuts for the application
export const defaultShortcuts: Shortcut[] = [
	// Navigation
	{
		key: "k",
		ctrl: true,
		description: "Abrir pesquisa global",
		category: "navigation",
		action: () => console.log("Open search"),
	},
	{
		key: "1",
		ctrl: true,
		description: "Ir para Visão Geral",
		category: "navigation",
		action: () => console.log("Go to overview"),
	},
	{
		key: "2",
		ctrl: true,
		description: "Ir para Ticantes",
		category: "navigation",
		action: () => console.log("Go to savers"),
	},
	{
		key: "3",
		ctrl: true,
		description: "Ir para Cobradores",
		category: "navigation",
		action: () => console.log("Go to collectors"),
	},
	{
		key: "4",
		ctrl: true,
		description: "Ir para Empréstimos",
		category: "navigation",
		action: () => console.log("Go to loans"),
	},
	{
		key: "ArrowLeft",
		alt: true,
		description: "Voltar",
		category: "navigation",
		action: () => console.log("Go back"),
	},
	{
		key: "ArrowRight",
		alt: true,
		description: "Avançar",
		category: "navigation",
		action: () => console.log("Go forward"),
	},

	// Actions
	{
		key: "n",
		ctrl: true,
		description: "Novo ticante",
		category: "actions",
		action: () => console.log("New saver"),
	},
	{
		key: "d",
		ctrl: true,
		description: "Registar depósito",
		category: "actions",
		action: () => console.log("New deposit"),
	},
	{
		key: "l",
		ctrl: true,
		description: "Solicitar empréstimo",
		category: "actions",
		action: () => console.log("New loan"),
	},
	{
		key: "s",
		ctrl: true,
		description: "Guardar",
		category: "actions",
		action: () => console.log("Save"),
	},
	{
		key: "Enter",
		shift: true,
		description: "Submeter formulário",
		category: "actions",
		action: () => console.log("Submit form"),
	},

	// Editing
	{
		key: "e",
		ctrl: true,
		description: "Editar item seleccionado",
		category: "editing",
		action: () => console.log("Edit item"),
	},
	{
		key: "Delete",
		description: "Eliminar item seleccionado",
		category: "editing",
		action: () => console.log("Delete item"),
	},
	{
		key: "Escape",
		description: "Cancelar / Fechar modal",
		category: "editing",
		action: () => console.log("Cancel/Close"),
	},
	{
		key: "z",
		ctrl: true,
		description: "Desfazer",
		category: "editing",
		action: () => console.log("Undo"),
	},
	{
		key: "y",
		ctrl: true,
		description: "Refazer",
		category: "editing",
		action: () => console.log("Redo"),
	},

	// General
	{
		key: "?",
		description: "Mostrar atalhos",
		category: "general",
		action: () => console.log("Show shortcuts"),
	},
	{
		key: "/",
		ctrl: true,
		description: "Focar na busca",
		category: "general",
		action: () => console.log("Focus search"),
	},
	{
		key: ",",
		ctrl: true,
		description: "Abrir configurações",
		category: "general",
		action: () => console.log("Open settings"),
	},
];
