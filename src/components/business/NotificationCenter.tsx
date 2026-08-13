import {
	AlertTriangle,
	Bell,
	CheckCircle,
	Info,
	Trash2,
	X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "#/lib/design-system";

interface Notification {
	id: string;
	type: "success" | "warning" | "error" | "info";
	title: string;
	message: string;
	time: string;
	read: boolean;
	action?: {
		label: string;
		onClick: () => void;
	};
}

interface NotificationCenterProps {
	isOpen: boolean;
	onClose: () => void;
}

export function NotificationCenter({
	isOpen,
	onClose,
}: NotificationCenterProps) {
	const [notifications, setNotifications] = useState<Notification[]>([
		{
			id: "1",
			type: "success",
			title: "Depósito Registado",
			message: "Depósito de 500 MZN registado para Carlos Mondlane",
			time: "Há 5 min",
			read: false,
		},
		{
			id: "2",
			type: "warning",
			title: "Dívida Detectada",
			message: "Ana Vilanculos entrou em dívida este mês",
			time: "Há 15 min",
			read: false,
			action: {
				label: "Ver Detalhes",
				onClick: () => console.log("View debt details"),
			},
		},
		{
			id: "3",
			type: "info",
			title: "Ciclo a Fechar",
			message: "O ciclo de Maio 2024 está prestes a fechar",
			time: "Há 1 hora",
			read: true,
			action: {
				label: "Gerir Ciclo",
				onClick: () => console.log("Manage cycle"),
			},
		},
		{
			id: "4",
			type: "error",
			title: "Erro de Sincronização",
			message: "Falha ao sincronizar dados com o servidor",
			time: "Há 2 horas",
			read: true,
		},
		{
			id: "5",
			type: "success",
			title: "Empréstimo Aprovado",
			message: "Empréstimo de 2.000 MZN aprovado para Bento Sitoe",
			time: "Há 3 horas",
			read: true,
		},
	]);

	const unreadCount = notifications.filter((n) => !n.read).length;

	const markAsRead = (id: string) => {
		setNotifications(
			notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
		);
	};

	const markAllAsRead = () => {
		setNotifications(notifications.map((n) => ({ ...n, read: true })));
	};

	const dismissNotification = (id: string) => {
		setNotifications(notifications.filter((n) => n.id !== id));
	};

	const clearAll = () => {
		setNotifications([]);
	};

	const getIcon = (type: Notification["type"]) => {
		switch (type) {
			case "success":
				return <CheckCircle size={18} className="text-emerald-500" />;
			case "warning":
				return <AlertTriangle size={18} className="text-amber-500" />;
			case "error":
				return <X size={18} className="text-red-500" />;
			case "info":
				return <Info size={18} className="text-blue-500" />;
			default:
				return <Bell size={18} className="text-slate-600" />;
		}
	};

	const getBgColor = (type: Notification["type"]) => {
		switch (type) {
			case "success":
				return "bg-emerald-500/10 border-emerald-500/20";
			case "warning":
				return "bg-amber-500/10 border-amber-500/20";
			case "error":
				return "bg-red-500/10 border-red-500/20";
			case "info":
				return "bg-blue-500/10 border-blue-500/20";
			default:
				return "bg-slate-100 border-slate-200";
		}
	};

	return (
		<div
			className={cn(
				"fixed top-0 right-0 h-full w-full sm:w-96 bg-white border-l border-slate-200 shadow-2xl z-50 transform transition-transform duration-300",
				isOpen ? "translate-x-0" : "translate-x-full",
			)}
		>
			{/* Header */}
			<div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50">
				<div className="flex items-center gap-3">
					<div className="relative">
						<Bell size={20} className="text-slate-900" />
						{unreadCount > 0 && (
							<span className="absolute -top-1 -right-1 w-5 h-5 bg-status-error text-white text-xs font-bold rounded-full flex items-center justify-center">
								{unreadCount}
							</span>
						)}
					</div>
					<h2 className="font-semibold text-slate-900">Notificações</h2>
				</div>
				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={markAllAsRead}
						className="text-xs text-slate-600 hover:text-slate-900 font-medium px-2 py-1 rounded hover:bg-slate-100 transition-colors"
						disabled={unreadCount === 0}
					>
						Marcar todas como lidas
					</button>
					<button
						type="button"
						onClick={onClose}
						className="p-1 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-900"
					>
						<X size={18} />
					</button>
				</div>
			</div>

			{/* Notifications List */}
			<div className="flex-1 overflow-y-auto">
				{notifications.length === 0 ? (
					<div className="flex flex-col items-center justify-center h-full p-8 text-center">
						<Bell size={48} className="text-slate-400 mb-4" />
						<p className="text-slate-600 text-sm">Sem notificações</p>
					</div>
				) : (
					<div className="divide-y divide-border">
						{notifications.map((notification) => (
							<button
								type="button"
								key={notification.id}
								className={cn(
									"w-full p-4 hover:bg-slate-100 transition-colors cursor-pointer text-left",
									!notification.read && "bg-slate-100/50",
								)}
								onClick={() => markAsRead(notification.id)}
							>
								<div className="flex items-start gap-3">
									<div
										className={cn(
											"w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border",
											getBgColor(notification.type),
										)}
									>
										{getIcon(notification.type)}
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex items-start justify-between gap-2">
											<h4
												className={cn(
													"font-semibold text-sm",
													notification.read
														? "text-slate-600"
														: "text-slate-900",
												)}
											>
												{notification.title}
											</h4>
											<button
												type="button"
												onClick={(e) => {
													e.stopPropagation();
													dismissNotification(notification.id);
												}}
												className="p-1 hover:bg-slate-200 rounded-lg transition-colors text-slate-400 hover:text-red-500"
											>
												<Trash2 size={14} />
											</button>
										</div>
										<p
											className={cn(
												"text-sm mt-1",
												notification.read ? "text-slate-400" : "text-slate-600",
											)}
										>
											{notification.message}
										</p>
										<div className="flex items-center justify-between mt-2">
											<span className="text-xs text-slate-400">
												{notification.time}
											</span>
											{notification.action && (
												<button
													type="button"
													onClick={(e) => {
														e.stopPropagation();
														notification.action?.onClick();
													}}
													className="text-xs text-emerald-600 font-medium hover:text-primary transition-colors"
												>
													{notification.action.label}
												</button>
											)}
										</div>
									</div>
								</div>
							</button>
						))}
					</div>
				)}
			</div>

			{/* Footer */}
			<div className="p-4 border-t border-slate-200 bg-slate-50">
				<button
					type="button"
					onClick={clearAll}
					className="w-full text-sm text-slate-600 hover:text-red-500 font-medium py-2 rounded-lg hover:bg-slate-100 transition-colors"
					disabled={notifications.length === 0}
				>
					Limpar Todas
				</button>
			</div>
		</div>
	);
}

// Notification Bell Component (for header)
interface NotificationBellProps {
	onClick: () => void;
	unreadCount?: number;
}

export function NotificationBell({
	onClick,
	unreadCount = 0,
}: NotificationBellProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-900"
		>
			<Bell size={20} />
			{unreadCount > 0 && (
				<span className="absolute top-1 right-1 w-5 h-5 bg-status-error text-white text-xs font-bold rounded-full flex items-center justify-center">
					{unreadCount}
				</span>
			)}
		</button>
	);
}
