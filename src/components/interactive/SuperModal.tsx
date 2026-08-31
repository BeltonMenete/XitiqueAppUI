import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { type ReactNode, useState } from "react";
import { cn } from "#/lib/design-system";

interface SuperModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
	size?: "sm" | "md" | "lg" | "xl" | "full";
	showProgress?: boolean;
	currentStep?: number;
	totalSteps?: number;
	onPrevious?: () => void;
	onNext?: () => void;
	hideCloseButton?: boolean;
}

interface SuperModalTab {
	id: string;
	label: string;
	icon?: ReactNode;
	content: ReactNode;
}

interface SuperModalWithTabsProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	tabs: SuperModalTab[];
	defaultTab?: string;
	size?: "sm" | "md" | "lg" | "xl" | "full";
}

// Multi-step modal
export function SuperModal({
	isOpen,
	onClose,
	title,
	children,
	size = "md",
	showProgress = false,
	currentStep = 1,
	totalSteps = 1,
	onPrevious,
	onNext,
	hideCloseButton = false,
}: SuperModalProps) {
	if (!isOpen) return null;

	const sizeClasses = {
		sm: "max-w-md",
		md: "max-w-2xl",
		lg: "max-w-4xl",
		xl: "max-w-6xl",
		full: "max-w-full mx-4",
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Backdrop */}
			<button
				type="button"
				className="absolute inset-0 bg-slate-100/80 backdrop-blur-sm animate-in fade-in duration-200 border-0 p-0 cursor-pointer"
				onClick={onClose}
				aria-label="Fechar"
			/>

			{/* Modal */}
			<div
				className={cn(
					"relative bg-white rounded-xl shadow-2xl w-full animate-in scale-in duration-200 flex flex-col max-h-[90vh]",
					sizeClasses[size],
				)}
			>
				{/* Header */}
				<div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
					<div className="flex-1">
						<h2 className="text-lg font-semibold text-slate-900 font-display">
							{title}
						</h2>
						{showProgress && (
							<p className="text-sm text-slate-600 mt-1">
								Passo {currentStep} de {totalSteps}
							</p>
						)}
					</div>
					{!hideCloseButton && (
						<button
							type="button"
							onClick={onClose}
							className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-900"
						>
							<X size={20} />
						</button>
					)}
				</div>

				{/* Progress Bar */}
				{showProgress && (
					<div className="px-6 py-2 bg-slate-50">
						<div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
							<div
								className="bg-secondary h-1.5 rounded-full transition-all duration-300"
								style={{ width: `${(currentStep / totalSteps) * 100}%` }}
							/>
						</div>
					</div>
				)}

				{/* Content */}
				<div className="flex-1 overflow-y-auto p-6">{children}</div>

				{/* Footer */}
				{(onPrevious || onNext) && (
					<div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
						{onPrevious && (
							<button
								type="button"
								onClick={onPrevious}
								disabled={currentStep === 1}
								className={cn(
									"flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
									currentStep === 1
										? "text-slate-400 cursor-not-allowed"
										: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
								)}
							>
								<ChevronLeft size={18} />
								Anterior
							</button>
						)}
						<div className="flex-1" />
						{onNext && (
							<button
								type="button"
								onClick={onNext}
								disabled={currentStep === totalSteps}
								className={cn(
									"flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
									currentStep === totalSteps
										? "text-slate-400 cursor-not-allowed"
										: "bg-secondary text-white hover:bg-secondary-dark",
								)}
							>
								{currentStep === totalSteps ? "Concluir" : "Próximo"}
								<ChevronRight size={18} />
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

// Tabbed modal
export function SuperModalWithTabs({
	isOpen,
	onClose,
	title,
	tabs,
	defaultTab,
	size = "lg",
}: SuperModalWithTabsProps) {
	const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

	if (!isOpen) return null;

	const sizeClasses = {
		sm: "max-w-md",
		md: "max-w-2xl",
		lg: "max-w-4xl",
		xl: "max-w-6xl",
		full: "max-w-full mx-4",
	};

	const activeTabData = tabs.find((tab) => tab.id === activeTab);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Backdrop */}
			<button
				type="button"
				className="absolute inset-0 bg-slate-100/80 backdrop-blur-sm animate-in fade-in duration-200 border-0 p-0 cursor-pointer"
				onClick={onClose}
				aria-label="Fechar"
			/>

			{/* Modal */}
			<div
				className={cn(
					"relative bg-white rounded-xl shadow-2xl w-full animate-in scale-in duration-200 flex flex-col max-h-[90vh]",
					sizeClasses[size],
				)}
			>
				{/* Header */}
				<div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
					<h2 className="text-lg font-semibold text-slate-900 font-display">
						{title}
					</h2>
					<button
						type="button"
						onClick={onClose}
						className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-900"
					>
						<X size={20} />
					</button>
				</div>

				{/* Tabs */}
				<div className="flex border-b border-slate-200 bg-slate-50">
					{tabs.map((tab) => (
						<button
							type="button"
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={cn(
								"flex items-center gap-2 px-6 py-3 font-medium transition-colors border-b-2",
								activeTab === tab.id
									? "border-secondary text-emerald-600 bg-white"
									: "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100",
							)}
						>
							{tab.icon}
							{tab.label}
						</button>
					))}
				</div>

				{/* Content */}
				<div className="flex-1 overflow-y-auto p-6">
					{activeTabData?.content}
				</div>
			</div>
		</div>
	);
}
