import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { APP_NAME, ANIMATION_DURATION } from "#/lib/constants";

export function LoginHeader() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: ANIMATION_DURATION.NORMAL, delay: 0.05 }}
			className="flex justify-between items-center"
		>
			<div className="flex items-center gap-2.5">
				<motion.img
					whileHover={{ rotate: 15 }}
					transition={{ duration: ANIMATION_DURATION.NORMAL }}
					src="/xitique-logo.svg"
					alt={APP_NAME}
					width={40}
					height={40}
					className="w-10 h-10"
				/>
				<span className="text-3xl font-semibold text-gray-900">
					{APP_NAME}
				</span>
			</div>

			<motion.a
				href="#"
				whileHover={{ x: 1 }}
				whileTap={{ scale: 0.99 }}
				transition={{ duration: ANIMATION_DURATION.FAST }}
				className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-sky-blue-600)]"
			>
				<UserPlus size={18} />
				<Link to="/signup">Criar conta</Link>
			</motion.a>
		</motion.div>
	);
}
