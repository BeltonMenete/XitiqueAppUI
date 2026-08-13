import type { ReactNode } from "react";
import { cn, getStatusColor, type StatusType } from "#/lib/design-system";

interface StatusBadgeProps {
	status: StatusType;
	children: ReactNode;
	className?: string;
	size?: "sm" | "md" | "lg";
}

export function StatusBadge({
	status,
	children,
	className = "",
	size = "md",
}: StatusBadgeProps) {
	const sizeClasses = {
		sm: "px-2 py-0.5 text-[10px]",
		md: "px-2.5 py-1 text-xs",
		lg: "px-3 py-1.5 text-sm",
	};

	return (
		<span
			className={cn(
				"inline-flex items-center rounded-full font-medium",
				getStatusColor(status),
				sizeClasses[size],
				className,
			)}
		>
			{children}
		</span>
	);
}

// Specific status badge components for common use cases
export function PaidBadge({ children = "Pago" }: { children?: ReactNode }) {
	return <StatusBadge status="success">{children}</StatusBadge>;
}

export function PendingBadge({
	children = "Pendente",
}: {
	children?: ReactNode;
}) {
	return <StatusBadge status="warning">{children}</StatusBadge>;
}

export function DebtBadge({
	children = "Em Dívida",
}: {
	children?: ReactNode;
}) {
	return <StatusBadge status="error">{children}</StatusBadge>;
}

export function ActiveBadge({ children = "Activo" }: { children?: ReactNode }) {
	return <StatusBadge status="active">{children}</StatusBadge>;
}

export function InactiveBadge({
	children = "Inativo",
}: {
	children?: ReactNode;
}) {
	return <StatusBadge status="inactive">{children}</StatusBadge>;
}

export function SuccessBadge({
	children = "Sucesso",
}: {
	children?: ReactNode;
}) {
	return <StatusBadge status="success">{children}</StatusBadge>;
}

export function WarningBadge({ children = "Aviso" }: { children?: ReactNode }) {
	return <StatusBadge status="warning">{children}</StatusBadge>;
}

export function ErrorBadge({ children = "Erro" }: { children?: ReactNode }) {
	return <StatusBadge status="error">{children}</StatusBadge>;
}

export function InfoBadge({ children = "Info" }: { children?: ReactNode }) {
	return <StatusBadge status="info">{children}</StatusBadge>;
}
