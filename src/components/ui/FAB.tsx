import { Plus, X } from "lucide-react";
import { useState } from "react";
import { cn } from "#/lib/design-system";

interface FABAction {
	icon: React.ReactNode;
	label: string;
	onClick: () => void;
	color?: string;
}

interface FABProps {
	mainAction?: () => void;
	mainIcon?: React.ReactNode;
	actions?: FABAction[];
	position?: "bottom-right" | "bottom-left";
}

export function FAB({
	mainAction,
	mainIcon = <Plus size={32} />,
	actions = [],
	position = "bottom-right",
}: FABProps) {
	const [isOpen, setIsOpen] = useState(false);

	const handleMainClick = () => {
		if (actions.length > 0) {
			setIsOpen(!isOpen);
		} else if (mainAction) {
			mainAction();
		}
	};

	const handleActionClick = (action: FABAction) => {
		action.onClick();
		setIsOpen(false);
	};

	const positionClasses = {
		"bottom-right": "bottom-6 right-6",
		"bottom-left": "bottom-6 left-6",
	};

	return (
		<div
			className={cn(
				"fixed flex flex-col gap-3 items-end z-40",
				positionClasses[position],
			)}
		>
			{isOpen && actions.length > 0 && (
				<div className="flex flex-col gap-3 mb-3 animate-in slide-in-from-bottom-2 duration-300">
					{actions.map((action, index) => (
						<button
							key={index}
							type="button"
							className={cn(
								"w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform",
								action.color || "bg-slate-900 text-white",
							)}
							onClick={() => handleActionClick(action)}
							title={action.label}
						>
							{action.icon}
						</button>
					))}
				</div>
			)}

			<button
				type="button"
				className={cn(
					"w-16 h-16 rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-all active:scale-95",
					"bg-slate-900 text-white",
				)}
				onClick={handleMainClick}
			>
				{isOpen && actions.length > 0 ? <X size={32} /> : mainIcon}
			</button>
		</div>
	);
}
