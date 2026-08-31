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
	id?: string;
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
	id,
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
						"flex-1 px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all",
						error
							? "border-status-error focus:ring-red-500/20 focus:border-red-500"
							: "border-slate-200",
					)}
					placeholder={placeholder}
				/>
				<div className="flex items-center gap-1">
					<button
						type="button"
						onClick={handleSave}
						className="p-1.5 hover:bg-emerald-500/10 text-emerald-500 rounded-lg transition-colors"
						title="Save (Enter)"
					>
						<Check size={16} />
					</button>
					<button
						type="button"
						onClick={handleCancel}
						className="p-1.5 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
						title="Cancel (Esc)"
					>
						<X size={16} />
					</button>
				</div>
				{error && (
					<span className="text-xs text-red-500 whitespace-nowrap">
						{error}
					</span>
				)}
			</div>
		);
	}

	return (
		<button
			type="button"
			id={id}
			onClick={handleStartEdit}
			disabled={disabled}
			className={cn(
				"group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all cursor-pointer",
				disabled ? "cursor-not-allowed opacity-50" : "hover:bg-slate-100",
				!value && "text-slate-400 italic",
				className,
			)}
		>
			<span className="text-sm">{value || placeholder}</span>
			{showEditIcon && !disabled && (
				<Edit2
					size={14}
					className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
				/>
			)}
		</button>
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
	id?: string;
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
	id,
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
					className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all resize-none"
					placeholder={placeholder}
				/>
				<div className="flex items-center justify-end gap-2 text-xs text-slate-400">
					<span>Ctrl+Enter to save, Esc to cancel</span>
					<div className="flex items-center gap-1">
						<button
							type="button"
							onClick={handleCancel}
							className="p-1.5 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
						>
							<X size={14} />
						</button>
						<button
							type="button"
							onClick={handleSave}
							className="p-1.5 hover:bg-emerald-500/10 text-emerald-500 rounded-lg transition-colors"
						>
							<Check size={14} />
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<button
			type="button"
			id={id}
			onClick={handleStartEdit}
			disabled={disabled}
			className={cn(
				"group relative inline-block px-3 py-2 rounded-lg transition-all cursor-pointer",
				disabled ? "cursor-not-allowed opacity-50" : "hover:bg-slate-100",
				!value && "text-slate-400 italic",
				className,
			)}
		>
			<p className="text-sm whitespace-pre-wrap">{value || placeholder}</p>
			{showEditIcon && !disabled && (
				<Edit2
					size={14}
					className="absolute top-2 right-2 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
				/>
			)}
		</button>
	);
}
