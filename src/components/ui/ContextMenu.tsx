import { useEffect, useRef } from "react";
import { cn } from "#/lib/design-system";

interface ContextMenuProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	className?: string;
	position?: { x: number; y: number };
}

export function ContextMenu({
	isOpen,
	onClose,
	children,
	className = "",
	position,
}: ContextMenuProps) {
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("keydown", handleEscape);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const positionStyle = position
		? { left: `${position.x}px`, top: `${position.y}px` }
		: {};

	return (
		<div
			ref={menuRef}
			className={cn(
				"fixed z-50 min-w-[200px] bg-white rounded-lg shadow-xl border border-slate-200 py-1",
				className,
			)}
			style={positionStyle}
		>
			{children}
		</div>
	);
}

interface ContextMenuItemProps {
	onClick: () => void;
	children: React.ReactNode;
	icon?: React.ReactNode;
	danger?: boolean;
	disabled?: boolean;
}

export function ContextMenuItem({
	onClick,
	children,
	icon,
	danger = false,
	disabled = false,
}: ContextMenuItemProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className={cn(
				"w-full px-4 py-2 flex items-center gap-3 text-sm transition-colors",
				"hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed",
				danger ? "text-red-600 hover:bg-red-50" : "text-slate-700",
			)}
		>
			{icon && <span className="w-4 h-4">{icon}</span>}
			<span className="flex-1 text-left">{children}</span>
		</button>
	);
}

interface ContextMenuSeparatorProps {
	className?: string;
}

export function ContextMenuSeparator({
	className = "",
}: ContextMenuSeparatorProps) {
	return <div className={cn("h-px bg-slate-200 my-1", className)} />;
}

interface ContextMenuHeaderProps {
	children: React.ReactNode;
	className?: string;
}

export function ContextMenuHeader({
	children,
	className = "",
}: ContextMenuHeaderProps) {
	return (
		<div
			className={cn(
				"px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider",
				className,
			)}
		>
			{children}
		</div>
	);
}
