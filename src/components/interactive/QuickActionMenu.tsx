import { createPortal } from "react-dom";
import { MoreVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "#/lib/design-system";

interface Action {
	id: string;
	label: string;
	icon?: React.ReactNode;
	onClick: () => void;
	danger?: boolean;
	disabled?: boolean;
	divider?: boolean;
}

interface QuickActionMenuProps {
	actions: Action[];
	trigger?: React.ReactNode;
	position?: "left" | "right" | "center";
	size?: "sm" | "md" | "lg";
}

export function QuickActionMenu({
	actions,
	trigger,
	position = "right",
	size = "md",
}: QuickActionMenuProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0, flip: false });
	const triggerRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node) && triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	// Calculate menu position when opening
	useEffect(() => {
		if (isOpen && triggerRef.current) {
			const triggerRect = triggerRef.current.getBoundingClientRect();
			const menuWidth = size === "sm" ? 160 : size === "md" ? 224 : 288;
			const menuHeight = 200; // Approximate height

			let x = triggerRect.left;
			let y = triggerRect.bottom + 8;
			let flip = false;

			// Check if menu would overflow right edge
			if (x + menuWidth > window.innerWidth) {
				x = triggerRect.right - menuWidth;
				flip = true;
			}

			// Check if menu would overflow left edge
			if (x < 0) {
				x = 8;
			}

			// Check if menu would overflow bottom edge
			if (y + menuHeight > window.innerHeight) {
				y = triggerRect.top - menuHeight - 8;
			}

			// Check if menu would overflow top edge
			if (y < 0) {
				y = 8;
			}

			setMenuPosition({ x, y, flip });
		}
	}, [isOpen, size]);

	const sizeClasses = {
		sm: "w-40",
		md: "w-56",
		lg: "w-72",
	};

	return (
		<>
			<button
				ref={triggerRef}
				onClick={() => setIsOpen(!isOpen)}
				className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-900"
			>
				{trigger || <MoreVertical size={18} />}
			</button>

			{isOpen &&
				createPortal(
					<div
						ref={menuRef}
						className={cn(
							"fixed bg-white border border-slate-200 rounded-lg shadow-xl z-[9999] animate-in scale-in duration-200 py-1",
							sizeClasses[size],
						)}
						style={{
							left: menuPosition.x,
							top: menuPosition.y,
						}}
					>
						{actions.map((action, _index) => (
							<div key={action.id}>
								<button
									onClick={() => {
										action.onClick();
										setIsOpen(false);
									}}
									disabled={action.disabled}
									className={cn(
										"w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors",
										action.disabled
											? "opacity-50 cursor-not-allowed"
											: "hover:bg-slate-100 cursor-pointer",
										action.danger ? "text-red-500" : "text-slate-900",
									)}
								>
									{action.icon}
									<span>{action.label}</span>
								</button>
								{action.divider && (
									<div className="my-1 border-t border-slate-200" />
								)}
							</div>
						))}
					</div>,
					document.body,
				)}
		</>
	);
}

interface ContextMenuProps {
	actions: Action[];
	children: React.ReactNode;
}

export function ContextMenu({ actions, children }: ContextMenuProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const menuRef = useRef<HTMLDivElement>(null);

	const handleContextMenu = (e: React.MouseEvent) => {
		e.preventDefault();
		setPosition({ x: e.clientX, y: e.clientY });
		setIsOpen(true);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<div onContextMenu={handleContextMenu}>{children}</div>

			{isOpen && (
				<div
					ref={menuRef}
					className="fixed bg-white border border-slate-200 rounded-lg shadow-xl z-50 py-1 min-w-[200px]"
					style={{ left: position.x, top: position.y }}
				>
					{actions.map((action) => (
						<button
							key={action.id}
							onClick={() => {
								action.onClick();
								setIsOpen(false);
							}}
							disabled={action.disabled}
							className={cn(
								"w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors",
								action.disabled
									? "opacity-50 cursor-not-allowed"
									: "hover:bg-slate-100 cursor-pointer",
								action.danger ? "text-red-500" : "text-slate-900",
							)}
						>
							{action.icon}
							<span>{action.label}</span>
						</button>
					))}
				</div>
			)}
		</>
	);
}
