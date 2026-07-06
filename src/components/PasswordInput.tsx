import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordInputProps {
	value: string;
	onChange: (value: string) => void;
	showPassword: boolean;
	onToggleShow: () => void;
	label?: string;
}

export function PasswordInput({
	value,
	onChange,
	showPassword,
	onToggleShow,
	label = "Palavra-passe",
}: PasswordInputProps) {
	return (
		<div className="space-y-1.5">
			<label
				htmlFor="password"
				className="block text-sm font-medium text-gray-700"
			>
				{label}
			</label>
			<div className="relative">
				<Lock
					className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
					size={20}
				/>
				<input
					id="password"
					type={showPassword ? "text" : "password"}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className="w-full pl-11 pr-12 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-(--color-mint-leaf-500) transition-all"
					placeholder="••••••••"
				/>
				<button
					type="button"
					onClick={onToggleShow}
					className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
				>
					{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
				</button>
			</div>
		</div>
	);
}
