import { CheckCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "#/lib/design-system";

interface ToastProps {
	message: string;
	type?: "success" | "error" | "warning" | "info";
	duration?: number;
	onClose?: () => void;
}

const typeStyles = {
	success: "bg-emerald-500",
	error: "bg-red-500",
	warning: "bg-amber-500",
	info: "bg-blue-500",
};

const typeIcons = {
	success: <CheckCircle size={16} />,
	error: <X size={16} />,
	warning: <X size={16} />,
	info: <CheckCircle size={16} />,
};

export function NotificationToast({
	message,
	type = "success",
	duration = 3000,
	onClose,
}: ToastProps) {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
			onClose?.();
		}, duration);

		return () => clearTimeout(timer);
	}, [duration, onClose]);

	if (!isVisible) return null;

	return (
		<div
			className={cn(
				"fixed bottom-4 right-4 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white animate-in slide-in-from-bottom-4 fade-in duration-300",
				typeStyles[type],
			)}
			role="alert"
			aria-live="polite"
		>
			{typeIcons[type]}
			<span className="text-sm font-medium">{message}</span>
			<button
				type="button"
				onClick={() => {
					setIsVisible(false);
					onClose?.();
				}}
				className="ml-2 hover:opacity-80 transition-opacity"
				aria-label="Fechar notificação"
			>
				<X size={16} />
			</button>
		</div>
	);
}
