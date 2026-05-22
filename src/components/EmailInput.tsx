import { motion } from "framer-motion";
import { User } from "lucide-react";
import { ANIMATION_DURATION } from "#/lib/constants";

interface EmailInputProps {
	value: string;
	onChange: (value: string) => void;
	delay?: number;
}

export function EmailInput({
	value,
	onChange,
	delay = 0.1,
}: EmailInputProps) {
	return (
		<motion.div
			layout
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: ANIMATION_DURATION.NORMAL, delay }}
			className="space-y-1.5"
		>
			<label
				htmlFor="email"
				className="block text-sm font-medium text-gray-700"
			>
				Email ou Nome de Utilizador
			</label>
			<motion.div
				whileFocus={{ scale: 1.005 }}
				transition={{ duration: ANIMATION_DURATION.FAST }}
				className="relative"
			>
				<User
					className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
					size={20}
				/>
				<input
					id="email"
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className="w-full pl-11 pr-5 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-mint-leaf-500)] transition-all"
					placeholder="exemplo@email.com"
				/>
			</motion.div>
		</motion.div>
	);
}
