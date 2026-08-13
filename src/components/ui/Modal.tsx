import { X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "#/lib/design-system";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
	size?: "sm" | "md" | "lg" | "xl";
	showCloseButton?: boolean;
	className?: string;
}

export function Modal({
	isOpen,
	onClose,
	title,
	children,
	size = "md",
	showCloseButton = true,
	className = "",
}: ModalProps) {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	if (!isOpen) return null;

	const sizeClasses = {
		sm: "max-w-md",
		md: "max-w-lg",
		lg: "max-w-2xl",
		xl: "max-w-4xl",
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Backdrop */}
			<button
				type="button"
				className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
				onClick={onClose}
				aria-label="Close modal"
			/>

			{/* Modal */}
			<div
				className={cn(
					"relative bg-white rounded-xl shadow-xl w-full mx-4 animate-in fade-in zoom-in-95 duration-200",
					sizeClasses[size],
					className,
				)}
			>
				{/* Header */}
				<div className="flex items-center justify-between p-5 border-b border-slate-200">
					<h2 className="text-lg font-semibold text-slate-900">{title}</h2>
					{showCloseButton && (
						<button
							type="button"
							onClick={onClose}
							className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
						>
							<X className="w-5 h-5 text-slate-400" />
						</button>
					)}
				</div>

				{/* Content */}
				<div className="p-5 max-h-[70vh] overflow-y-auto">{children}</div>
			</div>
		</div>
	);
}

interface ModalFooterProps {
	children: React.ReactNode;
	className?: string;
}

export function ModalFooter({ children, className = "" }: ModalFooterProps) {
	return (
		<div
			className={cn(
				"flex items-center justify-end gap-3 pt-4 border-t border-slate-200",
				className,
			)}
		>
			{children}
		</div>
	);
}
