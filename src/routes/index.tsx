import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { APP_NAME, ANIMATION_DURATION } from "#/lib/constants";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: ANIMATION_DURATION.NORMAL }}
			className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
		>
			<div className="text-center space-y-8">
				<motion.div
					initial={{ scale: 0.9 }}
					animate={{ scale: 1 }}
					transition={{ duration: ANIMATION_DURATION.NORMAL }}
				>
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
						Olá, bem-vindo ao {APP_NAME}
					</h1>
					<p className="text-lg text-gray-600">
						plataforma de Gestão de Poupanças e Organização Financeira
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: ANIMATION_DURATION.NORMAL, delay: 0.2 }}
				>
					<Link
						to="/login"
						className="inline-block px-8 py-3 bg-[var(--color-mint-leaf-500)] hover:bg-[var(--color-mint-leaf-600)] text-white font-semibold rounded-2xl shadow-lg transition-colors"
					>
						Entrar
					</Link>
				</motion.div>
			</div>
		</motion.div>
	);
}
