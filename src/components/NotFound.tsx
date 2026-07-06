import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

//
// 1. Definições de Ícones (SVG)
//
const IconShield = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.25"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
	</svg>
);

const IconHome = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.25"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
		<polyline points="9 22 9 12 15 12 15 22" />
	</svg>
);

const IconMessage = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.25"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
	</svg>
);

const IconCompass = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.25"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<circle cx="12" cy="12" r="10" />
		<polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
	</svg>
);

//
// 2. Componente de Fundo Grid Decorativo
//
const DecorativeGrid = () => (
	<div
		className="absolute inset-0 pointer-events-none z-0"
		style={{
			backgroundImage: `
                linear-gradient(to right, rgba(64, 73, 68, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(64, 73, 68, 0.08) 1px, transparent 1px)
            `,
			backgroundSize: "44px 44px",
			maskImage:
				"radial-gradient(ellipse 80% 60% at 50% 45%, black 30%, transparent 90%)",
			WebkitMaskImage:
				"radial-gradient(ellipse 80% 60% at 50% 45%, black 30%, transparent 90%)",
		}}
	/>
);

//
// 3. Componente de Círculos de Desfoque Decorativos
//
const DecorativeBlurs = () => (
	<>
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-80 sm:w-120 sm:h-120 md:w-160 md:h-160 bg-[#80bea6]/20 rounded-full blur-[90px] sm:blur-[130px] animate-pulse pointer-events-none z-0" />
		<div className="absolute top-[-12%] right-[-8%] w-65 h-65 sm:w-105 sm:h-105 bg-[#80bea6]/14 rounded-full blur-[90px] pointer-events-none z-0" />
		<div className="absolute bottom-[-12%] left-[-8%] w-65 h-65 sm:w-105 sm:h-105 bg-[#80bea6]/14 rounded-full blur-[90px] pointer-events-none z-0" />
	</>
);

//
// 4. Componente de Cartões Flutuantes
// Reposicionados para as margens externas do ecrã, fora da coluna central de texto
// (max-w-2xl), e só visíveis a partir de "lg" para nunca colidir com o conteúdo.
//
const FloatingCards = () => (
	<div className="hidden lg:block pointer-events-none select-none absolute inset-0 z-10">
		{/* Cartão Shield — canto superior esquerdo, junto à margem */}
		<div
			className="absolute top-[12%] left-[4%] xl:left-[8%] 2xl:left-[14%] bg-linear-to-br from-[#80bea6] to-[#5fa088] rounded-2xl p-3 xl:p-3.5 shadow-[0_8px_24px_-4px_rgba(95,160,136,0.55)] border border-white/40 animate-[float_2.2s_ease-in-out_infinite]"
			style={{ "--rot": "10deg" } as React.CSSProperties}
		>
			<div className="text-white drop-shadow-sm">
				<IconShield />
			</div>
		</div>

		{/* Cartão Home — canto superior direito, junto à margem */}
		<div
			className="absolute top-[16%] right-[4%] xl:right-[8%] 2xl:right-[14%] bg-linear-to-br from-[#80bea6] to-[#5fa088] rounded-2xl p-3 xl:p-3.5 shadow-[0_8px_24px_-4px_rgba(95,160,136,0.55)] border border-white/40 animate-[float_2.6s_ease-in-out_infinite] [animation-delay:0.3s]"
			style={{ "--rot": "-8deg" } as React.CSSProperties}
		>
			<div className="text-white drop-shadow-sm">
				<IconHome />
			</div>
		</div>

		{/* Cartão Message — canto inferior esquerdo, abaixo da coluna de texto */}
		<div
			className="absolute bottom-[14%] left-[5%] xl:left-[10%] 2xl:left-[16%] bg-linear-to-br from-[#80bea6] to-[#5fa088] rounded-2xl p-3 xl:p-3.5 shadow-[0_8px_24px_-4px_rgba(95,160,136,0.55)] border border-white/40 animate-[float_2.4s_ease-in-out_infinite] [animation-delay:0.6s]"
			style={{ "--rot": "7deg" } as React.CSSProperties}
		>
			<div className="text-white drop-shadow-sm">
				<IconMessage />
			</div>
		</div>

		{/* Cartão Compass — canto inferior direito, abaixo da coluna de texto */}
		<div
			className="absolute bottom-[18%] right-[5%] xl:right-[10%] 2xl:right-[16%] bg-linear-to-br from-[#80bea6] to-[#5fa088] rounded-2xl p-3 xl:p-3.5 shadow-[0_8px_24px_-4px_rgba(95,160,136,0.55)] border border-white/40 animate-[float_2.8s_ease-in-out_infinite] [animation-delay:0.9s]"
			style={{ "--rot": "-10deg" } as React.CSSProperties}
		>
			<div className="text-white drop-shadow-sm">
				<IconCompass />
			</div>
		</div>
	</div>
);

//
// 5. Componente Principal NotFound
//
export default function NotFound() {
	const [mounted, setMounted] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleHomePage = () => {
		navigate({
			to: "/",
			search: { welcome: true },
		});
	};

	return (
		<div className="min-h-screen bg-[#eceeeb] relative overflow-hidden flex flex-col selection:bg-[#80bea6]/30 font-sans">
			{/* CSS Injetado para animações (Keyframes) */}
			<style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(var(--rot, 0deg)); }
                    50% { transform: translateY(-18px) rotate(var(--rot, 0deg)); }
                }
            `}</style>

			{/* Elementos Decorativos de Fundo */}
			<DecorativeGrid />
			<DecorativeBlurs />

			{/* Elementos Interativos Flutuantes */}
			<FloatingCards />

			{/* Área de Conteúdo Principal - Centralizada */}
			<main className="flex-1 flex items-center justify-center px-6 py-12 relative z-20">
				<div
					className={`max-w-2xl w-full text-center transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
				>
					{/* Etiqueta de estado, acima do 404 */}
					<div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full bg-white/70 border border-[#80bea6]/30 backdrop-blur-sm">
						<span className="w-1.5 h-1.5 rounded-full bg-[#5fa088] animate-pulse" />
						<span className="text-[11px] font-bold tracking-[0.18em] text-[#3c5048] uppercase">
							Erro 404
						</span>
					</div>

					{/* Invólucro do Texto 404 (com efeito hover) */}
					<div className="relative mb-4 sm:mb-6 inline-block select-none group">
						{/* Brilho de fundo interativo */}
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-[#80bea6]/25 rounded-full blur-md transition-transform duration-700 group-hover:scale-110" />

						{/* O Texto 404 em si */}
						<h1 className="text-[100px] sm:text-[150px] md:text-[200px] lg:text-[240px] font-black leading-none relative tracking-tighter selection:bg-white/0 bg-linear-to-b from-[#6cab92] via-[#5a9d83] to-[#3c5048] bg-clip-text text-transparent drop-shadow-[0_6px_18px_rgba(60,80,72,0.25)]">
							404
						</h1>
					</div>

					{/* Título da Página */}
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#191c1b] mb-4 tracking-tight relative z-30">
						Página não encontrada
					</h2>

					{/* Texto Descritivo */}
					<p className="text-sm sm:text-base md:text-lg text-[#404944] mb-8 max-w-md md:max-w-xl mx-auto leading-relaxed text-balance font-medium relative z-30">
						Desculpe, o ecrã que procura não existe ou foi movido. Verifique o
						endereço ou volte ao seu painel administrativo.
					</p>
				</div>
			</main>

			{/* Rodapé - Contendo o Botão de Ação */}
			<footer className="relative z-20 pb-8 sm:pb-12 pt-2 transition-all duration-700 delay-100">
				<div className="flex justify-center px-6">
					<button
						onClick={handleHomePage}
						className="group inline-flex items-center gap-3 px-8 py-4 bg-[#191c1b] rounded-xl border border-[#191c1b] shadow-lg shadow-black/10 transition-all duration-300 hover:bg-[#5fa088] hover:border-[#5fa088] hover:shadow-xl hover:shadow-[#80bea6]/30 active:scale-[0.98] cursor-pointer w-full sm:w-auto justify-center"
					>
						<div className="w-2.5 h-2.5 bg-[#80bea6] rounded-full transition-all duration-300 group-hover:bg-white group-hover:scale-125 shrink-0" />

						<span className="text-xs font-bold text-white tracking-widest transition-colors duration-300 whitespace-nowrap">
							VOLTAR AO SISTEMA DE GESTÃO
						</span>
					</button>
				</div>
			</footer>
		</div>
	);
}
