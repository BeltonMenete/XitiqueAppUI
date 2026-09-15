import { createFileRoute, Link } from "@tanstack/react-router";
import { AppButton } from "#/components/ui/AppButton";
import { APP_NAME, APP_TAGLINE } from "#/lib/constants";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
		e.preventDefault();
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div className="min-h-screen bg-[#0E1512] text-slate-100 flex flex-col justify-between selection:bg-[#4CAF50] selection:text-white font-sans antialiased">
			{/* Animated Ambient Background Glows */}
			<div className="fixed inset-0 pointer-events-none overflow-hidden">
				<div className="absolute -top-40 -left-40 w-96 h-96 bg-[#21996B]/20 rounded-full blur-3xl animate-pulse duration-[7000ms]" />
				<div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#4CAF50]/15 rounded-full blur-3xl animate-pulse duration-[10000ms]" />
			</div>

			{/* Header Sticky Totalmente Transparente */}
			<header className="sticky top-0 z-50 w-full bg-transparent backdrop-blur-md border-b border-white/5 animate-[fadeIn_0.6s_ease-out]">
				<div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
					<div className="flex items-center space-x-3 group cursor-pointer">
						<img
							src="/Xitique-logo-transparent.svg"
							alt={`${APP_NAME} Logo`}
							className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
						/>
						{/* Custom Gradient Wordmark matching logo */}
						<span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-[#4CAF50] via-[#21996B] to-[#03A091] bg-clip-text text-transparent">
							Xitique
						</span>
					</div>

					<nav className="flex items-center space-x-6">
						<a
							href="#modelo-de-negocio"
							onClick={(e) => scrollToSection(e, "modelo-de-negocio")}
							className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 hidden sm:block"
						>
							Como Funciona
						</a>
						<Link to="/login">
							<AppButton className="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-300 shadow-sm hover:border-white/20 active:scale-95">
								Entrar
							</AppButton>
						</Link>
					</nav>
				</div>
			</header>

			{/* Main Hero Section */}
			<main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16 max-w-5xl mx-auto text-center">
				{/* Animated Status Pill */}
				<div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-xs font-medium text-emerald-400 mb-8 backdrop-blur-md animate-[slideDown_0.8s_ease-out]">
					<span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
					Plataforma de Poupança Comunitária
				</div>

				{/* Hero Title & Tagline with Staggered Fade-Up */}
				<h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
					A poupança informal no seu local de trabalho,{" "}
					<span className="bg-gradient-to-r from-[#4CAF50] via-emerald-400 to-teal-300 bg-clip-text text-transparent animate-pulse duration-[4000ms]">
						agora 100% digital.
					</span>
				</h1>

				<p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
					{APP_TAGLINE}
				</p>

				{/* Interactive Call to Action Buttons */}
				<div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
					<a
						href="http://localhost:4000/signup"
						className="w-full sm:w-auto"
					>
						<AppButton className="w-full sm:w-auto bg-[#21996B] hover:bg-[#1b7d57] text-white font-semibold text-base px-8 py-3.5 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/40 active:translate-y-0 active:scale-95">
							Tornar-se membro da comunidade
						</AppButton>
					</a>

					<a
						href="#modelo-de-negocio"
						onClick={(e) => scrollToSection(e, "modelo-de-negocio")}
						className="w-full sm:w-auto"
					>
						<AppButton
							type="button"
							className="w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 font-semibold text-base px-6 py-3.5 rounded-xl transition-all duration-300 hover:border-white/20 active:scale-95"
						>
							Conhecer o Modelo
						</AppButton>
					</a>
				</div>

				{/* Interactive Feature Highlight Cards */}
				<div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-left animate-[fadeInUp_0.8s_ease-out_0.8s_both]">
					<div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.06] hover:border-emerald-500/30">
						<div className="text-emerald-400 font-bold text-2xl mb-1">0.5s</div>
						<div className="text-white font-semibold text-sm">Registo Ultra-rápido</div>
						<div className="text-slate-400 text-xs mt-1">Marcação instantânea no cartão digital, mesmo offline.</div>
					</div>

					<div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.06] hover:border-emerald-500/30">
						<div className="text-emerald-400 font-bold text-2xl mb-1">100%</div>
						<div className="text-white font-semibold text-sm">Auditoria Anti-Fraude</div>
						<div className="text-slate-400 text-xs mt-1">Fechamento diário e detecção de diferenças em tempo real.</div>
					</div>

					<div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.06] hover:border-emerald-500/30">
						<div className="text-emerald-400 font-bold text-2xl mb-1">Total</div>
						<div className="text-white font-semibold text-sm">Transparência em Tempo Real</div>
						<div className="text-slate-400 text-xs mt-1">Ticantes e organizadores veem exatamente a mesma informação.</div>
					</div>
				</div>
			</main>

			{/* Modelo de Negócio Section */}
			<section id="modelo-de-negocio" className="relative z-10 border-t border-white/5 bg-[#0A0F0D] py-20 px-6 scroll-mt-28">
				<div className="max-w-5xl mx-auto space-y-12">
					<div className="text-center space-y-3">
						<h2 className="text-3xl font-bold text-white tracking-tight">Como Funciona o Modelo de Negócio</h2>
						<p className="text-slate-400 max-w-xl mx-auto text-sm">
							Regras simples, transparentes e adaptadas à realidade dos grupos de poupança no local de trabalho.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 transition-all duration-300 hover:border-emerald-500/20 hover:bg-white/[0.04]">
							<h3 className="text-emerald-400 font-semibold mb-2">1. Taxa Diária Fixa & Comissão</h3>
							<p className="text-slate-300 text-sm leading-relaxed">
								O cliente define o valor fixo diário no início do mês. Independentemente da taxa, a organização fica com a comissão equivalente a 1 dia pelo serviço de gestão.
							</p>
						</div>

						<div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 transition-all duration-300 hover:border-emerald-500/20 hover:bg-white/[0.04]">
							<h3 className="text-emerald-400 font-semibold mb-2">2. Gestão de Empréstimos</h3>
							<p className="text-slate-300 text-sm leading-relaxed">
								Acesso flexível a microcrédito sem taxas ocultas, com juros fixos de 10%. Caso haja saldo pendente, a dívida é unificada com a poupança do mês seguinte.
							</p>
						</div>

						<div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 transition-all duration-300 hover:border-emerald-500/20 hover:bg-white/[0.04]">
							<h3 className="text-emerald-400 font-semibold mb-2">3. Fechamento Diário Obrigatório</h3>
							<p className="text-slate-300 text-sm leading-relaxed">
								Os cobradores declaram o caixa físico diariamente no app. Qualquer divergência entre o valor físico e digital gera alerta imediato para o organizador.
							</p>
						</div>

						<div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 transition-all duration-300 hover:border-emerald-500/20 hover:bg-white/[0.04]">
							<h3 className="text-emerald-400 font-semibold mb-2">4. Operação Offline-First</h3>
							<p className="text-slate-300 text-sm leading-relaxed">
								Sem dependência contínua da internet durante o dia. Os cobradores registam os pagamentos e sincronizam todas as transações em segundos quando houver rede.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="relative z-10 py-8 border-t border-white/5 text-center text-xs text-slate-500">
				© {new Date().getFullYear()} {APP_NAME}. Todos os direitos reservados.
			</footer>
		</div>
	);
}