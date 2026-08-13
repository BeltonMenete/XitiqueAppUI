import { Check, Edit2, X } from "lucide-react";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { cn } from "#/lib/design-system";

interface InlineEditorProps {
	value: string;
	onSave: (value: string) => void;
	type?: "text" | "number" | "tel" | "email";
	placeholder?: string;
	maxLength?: number;
	className?: string;
	disabled?: boolean;
	showEditIcon?: boolean;
	validation?: (value: string) => string | null;
}

export function InlineEditor({
	value,
	onSave,
	type = "text",
	placeholder = "Click to edit",
	maxLength,
	className,
	disabled = false,
	showEditIcon = true,
	validation,
}: InlineEditorProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [editValue, setEditValue] = useState(value);
	const [error, setError] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setEditValue(value);
	}, [value]);

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus();
			inputRef.current.select();
		}
	}, [isEditing]);

	const handleStartEdit = () => {
		if (disabled) return;
		setIsEditing(true);
		setEditValue(value);
		setError(null);
	};

	const handleSave = () => {
		if (validation) {
			const validationError = validation(editValue);
			if (validationError) {
				setError(validationError);
				return;
			}
		}

		onSave(editValue);
		setIsEditing(false);
		setError(null);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditValue(value);
		setError(null);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSave();
		} else if (e.key === "Escape") {
			e.preventDefault();
			handleCancel();
		}
	};

	const handleBlur = () => {
		if (editValue !== value) {
			handleSave();
		} else {
			handleCancel();
		}
	};

	if (isEditing) {
		return (
			<div className="flex items-center gap-2">
				<input
					ref={inputRef}
					type={type}
					value={editValue}
					onChange={(e) => setEditValue(e.target.value)}
					onKeyDown={handleKeyDown}
					onBlur={handleBlur}
					maxLength={maxLength}
					className={cn(
						"flex-1 px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all",
						error
							? "border-status-error focus:ring-status-error/20 focus:border-status-error"
							: "border-border",
					)}
					placeholder={placeholder}
				/>
				<div className="flex items-center gap-1">
					<button
						onClick={handleSave}
						className="p-1.5 hover:bg-status-success/10 text-status-success rounded-lg transition-colors"
						title="Save (Enter)"
					>
						<Check size={16} />
					</button>
					<button
						onClick={handleCancel}
						className="p-1.5 hover:bg-status-error/10 text-status-error rounded-lg transition-colors"
						title="Cancel (Esc)"
					>
						<X size={16} />
					</button>
				</div>
				{error && (
					<span className="text-xs text-status-error whitespace-nowrap">
						{error}
					</span>
				)}
			</div>
		);
	}

	return (
		<div
			onClick={handleStartEdit}
			className={cn(
				"group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all cursor-pointer",
				disabled
					? "cursor-not-allowed opacity-50"
					: "hover:bg-background-secondary",
				!value && "text-text-tertiary italic",
				className,
			)}
		>
			<span className="text-sm">{value || placeholder}</span>
			{showEditIcon && !disabled && (
				<Edit2
					size={14}
					className="text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity"
				/>
			)}
		</div>
	);
}

interface InlineTextAreaProps {
	value: string;
	onSave: (value: string) => void;
	placeholder?: string;
	maxLength?: number;
	rows?: number;
	className?: string;
	disabled?: boolean;
	showEditIcon?: boolean;
}

export function InlineTextArea({
	value,
	onSave,
	placeholder = "Click to edit",
	maxLength,
	rows = 3,
	className,
	disabled = false,
	showEditIcon = true,
}: InlineTextAreaProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [editValue, setEditValue] = useState(value);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		setEditValue(value);
	}, [value]);

	useEffect(() => {
		if (isEditing && textareaRef.current) {
			textareaRef.current.focus();
			textareaRef.current.select();
		}
	}, [isEditing]);

	const handleStartEdit = () => {
		if (disabled) return;
		setIsEditing(true);
		setEditValue(value);
	};

	const handleSave = () => {
		onSave(editValue);
		setIsEditing(false);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditValue(value);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			handleSave();
		} else if (e.key === "Escape") {
			e.preventDefault();
			handleCancel();
		}
	};

	if (isEditing) {
		return (
			<div className="space-y-2">
				<textarea
					ref={textareaRef}
					value={editValue}
					onChange={(e) => setEditValue(e.target.value)}
					onKeyDown={handleKeyDown}
					onBlur={handleSave}
					maxLength={maxLength}
					rows={rows}
					className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all resize-none"
					placeholder={placeholder}
				/>
				<div className="flex items-center justify-end gap-2 text-xs text-text-tertiary">
					<span>Ctrl+Enter to save, Esc to cancel</span>
					<div className="flex items-center gap-1">
						<button
							onClick={handleCancel}
							className="p-1.5 hover:bg-status-error/10 text-status-error rounded-lg transition-colors"
						>
							<X size={14} />
						</button>
						<button
							onClick={handleSave}
							className="p-1.5 hover:bg-status-success/10 text-status-success rounded-lg transition-colors"
						>
							<Check size={14} />
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			onClick={handleStartEdit}
			className={cn(
				"group relative inline-block px-3 py-2 rounded-lg transition-all cursor-pointer",
				disabled
					? "cursor-not-allowed opacity-50"
					: "hover:bg-background-secondary",
				!value && "text-text-tertiary italic",
				className,
			)}
		>
			<p className="text-sm whitespace-pre-wrap">{value || placeholder}</p>
			{showEditIcon && !disabled && (
				<Edit2
					size={14}
					className="absolute top-2 right-2 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity"
				/>
			)}
		</div>
	);
}
