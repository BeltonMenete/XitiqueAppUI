import { motion } from "framer-motion";
import { FADE, DURATION } from "#/lib/constants";

export function FormField({
	label,
	icon: Icon,
	type = "text",
	value,
	onChange,
	toggleIcon,
	onToggle,
	delay = 0.1,
}: {
	label: string;
	icon: React.ComponentType<{ size: number; className: string }>;
	type?: string;
	value: string;
	onChange: (val: string) => void;
	toggleIcon?: React.ReactNode;
	onToggle?: () => void;
	delay?: number;
}) {
	return (
		<motion.div
			{...FADE}
			transition={{ duration: DURATION.NORMAL, delay }}
			className="space-y-1.5"
		>
			<label className="block text-sm font-medium text-gray-700">
				{label}
			</label>
			<div className="relative">
				<Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
				<input
					type={type}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className="w-full pl-11 pr-12 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-mint-leaf-500)] transition-all"
					required
				/>
				{toggleIcon && (
					<button
						type="button"
						onClick={onToggle}
						className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
					>
						{toggleIcon}
					</button>
				)}
			</div>
		</motion.div>
	);
}
