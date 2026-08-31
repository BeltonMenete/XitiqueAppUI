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
	saverId: _saverId,
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
					className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
					size={18}
				/>
				<input
					type="text"
					placeholder="Pesquisar ação..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
				/>
			</div>

			{/* Category Filter */}
			<div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
				{categories.map((category) => (
					<button
						type="button"
						key={category.id}
						onClick={() => setSelectedCategory(category.id)}
						className={cn(
							"flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap",
							selectedCategory === category.id
								? "bg-secondary text-white"
								: "bg-slate-100 text-slate-600 hover:bg-slate-200",
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
						type="button"
						key={action.id}
						onClick={() => {
							action.action();
							onClose();
						}}
						className={cn(
							"group flex items-start gap-3 p-4 rounded-lg border transition-all text-left hover:border-secondary hover:bg-secondary/5",
							selectedCategory === "all" || selectedCategory === action.category
								? "border-slate-200"
								: "border-slate-200",
						)}
					>
						<div
							className={cn(
								"w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
								action.category === "deposit" &&
									"bg-emerald-600/10 text-emerald-600",
								action.category === "loan" && "bg-amber-500/10 text-amber-500",
								action.category === "info" && "bg-blue-500/10 text-blue-500",
								action.category === "admin" && "bg-slate-200 text-slate-600",
							)}
						>
							{action.icon}
						</div>
						<div className="flex-1 min-w-0">
							<h4 className="font-semibold text-slate-900 text-sm group-hover:text-emerald-600 transition-colors">
								{action.label}
							</h4>
							<p className="text-xs text-slate-600 mt-0.5">
								{action.description}
							</p>
							{action.shortcut && (
								<span className="inline-block mt-2 px-2 py-0.5 bg-slate-200 text-slate-400 text-[10px] font-mono rounded">
									{action.shortcut}
								</span>
							)}
						</div>
					</button>
				))}
			</div>

			{/* Recent Actions */}
			<div className="mt-6 pt-4 border-t border-slate-200">
				<h4 className="text-sm font-semibold text-slate-900 mb-3">
					Ações Recentes
				</h4>
				<div className="space-y-2">
					{[
						{ action: "Registar Depósito", time: "Há 5 min" },
						{ action: "Solicitar Empréstimo", time: "Há 15 min" },
						{ action: "Ligar via WhatsApp", time: "Há 1 hora" },
					].map((item) => (
						<div
							key={item.action}
							className="flex items-center justify-between p-2 bg-slate-100 rounded-lg"
						>
							<span className="text-sm text-slate-900">{item.action}</span>
							<span className="text-xs text-slate-400">{item.time}</span>
						</div>
					))}
				</div>
			</div>

			{/* Keyboard Shortcuts Hint */}
			<div className="mt-4 p-3 bg-slate-100 rounded-lg">
				<p className="text-xs text-slate-400 mb-2">
					<span className="font-semibold text-slate-600">Dica:</span> Pressione{" "}
					<kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono">
						Ctrl
					</kbd>{" "}
					+{" "}
					<kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono">
						K
					</kbd>{" "}
					para abrir as ações rápidas de qualquer lugar
				</p>
			</div>
		</SuperModal>
	);
}
