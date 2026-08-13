import {
	Bell,
	Calendar,
	CreditCard,
	DollarSign,
	FileText,
	Phone,
	Plus,
	Search,
	Settings,
	TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { SuperModal } from "#/components/interactive";
import { cn } from "#/lib/design-system";

interface QuickActionsModalProps {
	isOpen: boolean;
	onClose: () => void;
	saverId?: string;
	saverName?: string;
}

interface QuickAction {
	id: string;
	label: string;
	icon: React.ReactNode;
	description: string;
	shortcut?: string;
	action: () => void;
	category: "deposit" | "loan" | "info" | "admin";
}

export function QuickActionsModal({
	isOpen,
	onClose,
	saverId,
	saverName,
}: QuickActionsModalProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string>("all");

	const allActions: QuickAction[] = [
		{
			id: "deposit",
			label: "Registar Depósito",
			icon: <DollarSign size={20} />,
			description: "Adicionar um depósito para o ticante",
			shortcut: "Ctrl+D",
			category: "deposit",
			action: () => console.log("Open deposit modal"),
		},
		{
			id: "quick-deposit",
			label: "Depósito Rápido",
			icon: <DollarSign size={20} />,
			description: "Depósito de valor diário padrão",
			shortcut: "Ctrl+Shift+D",
			category: "deposit",
			action: () => console.log("Quick deposit"),
		},
		{
			id: "loan-request",
			label: "Solicitar Empréstimo",
			icon: <CreditCard size={20} />,
			description: "Solicitar empréstimo baseado na poupança",
			shortcut: "Ctrl+L",
			category: "loan",
			action: () => console.log("Open loan modal"),
		},
		{
			id: "loan-calculate",
			label: "Calcular Empréstimo",
			icon: <TrendingUp size={20} />,
			description: "Simular valor disponível para empréstimo",
			category: "loan",
			action: () => console.log("Calculate loan"),
		},
		{
			id: "call",
			label: "Ligar via WhatsApp",
			icon: <Phone size={20} />,
			description: "Contactar ticante via WhatsApp",
			shortcut: "Ctrl+W",
			category: "info",
			action: () => console.log("Open WhatsApp"),
		},
		{
			id: "view-history",
			label: "Ver Histórico",
			icon: <FileText size={20} />,
			description: "Ver histórico de depósitos e pagamentos",
			category: "info",
			action: () => console.log("View history"),
		},
		{
			id: "view-calendar",
			label: "Ver Calendário",
			icon: <Calendar size={20} />,
			description: "Ver calendário de pagamentos",
			category: "info",
			action: () => console.log("View calendar"),
		},
		{
			id: "edit-saver",
			label: "Editar Ticante",
			icon: <Settings size={20} />,
			description: "Editar informações do ticante",
			shortcut: "Ctrl+E",
			category: "admin",
			action: () => console.log("Edit saver"),
		},
		{
			id: "new-saver",
			label: "Novo Ticante",
			icon: <Plus size={20} />,
			description: "Registar novo ticante",
			shortcut: "Ctrl+N",
			category: "admin",
			action: () => console.log("New saver"),
		},
		{
			id: "notifications",
			label: "Notificações",
			icon: <Bell size={20} />,
			description: "Ver notificações do sistema",
			shortcut: "Ctrl+Alt+N",
			category: "admin",
			action: () => console.log("View notifications"),
		},
		{
			id: "settings",
			label: "Configurações",
			icon: <Settings size={20} />,
			description: "Abrir configurações da organização",
			shortcut: "Ctrl+,",
			category: "admin",
			action: () => console.log("Open settings"),
		},
	];

	const filteredActions = allActions.filter((action) => {
		const matchesSearch =
			action.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
			action.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory =
			selectedCategory === "all" || action.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	const categories = [
		{ id: "all", label: "Todas", icon: <Search size={16} /> },
		{ id: "deposit", label: "Depósitos", icon: <DollarSign size={16} /> },
		{ id: "loan", label: "Empréstimos", icon: <CreditCard size={16} /> },
		{ id: "info", label: "Informação", icon: <FileText size={16} /> },
		{ id: "admin", label: "Administração", icon: <Settings size={16} /> },
	];

	return (
		<SuperModal
			isOpen={isOpen}
			onClose={onClose}
			title={saverName ? `Ações Rápidas - ${saverName}` : "Ações Rápidas"}
			size="md"
		>
			{/* Search */}
			<div className="relative mb-4">
				<Search
					className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
					size={18}
				/>
				<input
					type="text"
					placeholder="Pesquisar ação..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full pl-10 pr-4 py-2.5 bg-background-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
				/>
			</div>

			{/* Category Filter */}
			<div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
				{categories.map((category) => (
					<button
						key={category.id}
						onClick={() => setSelectedCategory(category.id)}
						className={cn(
							"flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap",
							selectedCategory === category.id
								? "bg-secondary text-white"
								: "bg-background-secondary text-text-secondary hover:bg-background-tertiary",
						)}
					>
						{category.icon}
						{category.label}
					</button>
				))}
			</div>

			{/* Actions Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
				{filteredActions.map((action) => (
					<button
						key={action.id}
						onClick={() => {
							action.action();
							onClose();
						}}
						className={cn(
							"group flex items-start gap-3 p-4 rounded-lg border transition-all text-left hover:border-secondary hover:bg-secondary/5",
							selectedCategory === "all" || selectedCategory === action.category
								? "border-border"
								: "border-border",
						)}
					>
						<div
							className={cn(
								"w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
								action.category === "deposit" &&
									"bg-secondary/10 text-secondary",
								action.category === "loan" &&
									"bg-status-warning/10 text-status-warning",
								action.category === "info" &&
									"bg-status-info/10 text-status-info",
								action.category === "admin" &&
									"bg-background-tertiary text-text-secondary",
							)}
						>
							{action.icon}
						</div>
						<div className="flex-1 min-w-0">
							<h4 className="font-semibold text-text-primary text-sm group-hover:text-secondary transition-colors">
								{action.label}
							</h4>
							<p className="text-xs text-text-secondary mt-0.5">
								{action.description}
							</p>
							{action.shortcut && (
								<span className="inline-block mt-2 px-2 py-0.5 bg-background-tertiary text-text-tertiary text-[10px] font-mono rounded">
									{action.shortcut}
								</span>
							)}
						</div>
					</button>
				))}
			</div>

			{/* Recent Actions */}
			<div className="mt-6 pt-4 border-t border-border">
				<h4 className="text-sm font-semibold text-text-primary mb-3">
					Ações Recentes
				</h4>
				<div className="space-y-2">
					{[
						{ action: "Registar Depósito", time: "Há 5 min" },
						{ action: "Solicitar Empréstimo", time: "Há 15 min" },
						{ action: "Ligar via WhatsApp", time: "Há 1 hora" },
					].map((item, index) => (
						<div
							key={index}
							className="flex items-center justify-between p-2 bg-background-secondary rounded-lg"
						>
							<span className="text-sm text-text-primary">{item.action}</span>
							<span className="text-xs text-text-tertiary">{item.time}</span>
						</div>
					))}
				</div>
			</div>

			{/* Keyboard Shortcuts Hint */}
			<div className="mt-4 p-3 bg-background-secondary rounded-lg">
				<p className="text-xs text-text-tertiary mb-2">
					<span className="font-semibold text-text-secondary">Dica:</span>{" "}
					Pressione{" "}
					<kbd className="px-1.5 py-0.5 bg-white border border-border rounded text-[10px] font-mono">
						Ctrl
					</kbd>{" "}
					+{" "}
					<kbd className="px-1.5 py-0.5 bg-white border border-border rounded text-[10px] font-mono">
						K
					</kbd>{" "}
					para abrir as ações rápidas de qualquer lugar
				</p>
			</div>
		</SuperModal>
	);
}
