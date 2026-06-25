import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';

const IconShield = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
);

const IconHome = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

const IconMessage = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

export default function NotFoundPage() {
    const [mounted, setMounted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleHomePage = () => {
        navigate({
            to: '/',
            search: { welcome: true }
        });
    };

    return (
        /* Fundo alterado para #eceeeb para reduzir a claridade excessiva e dar contraste */
        <div className="min-h-screen bg-[#eceeeb] relative overflow-hidden flex flex-col justify-between selection:bg-[#80bea6]/30">

            {/* Background Grid - Ajustado a opacidade para melhor visibilidade sobre o novo fundo */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(128, 190, 166, 0.15) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(128, 190, 166, 0.15) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Decorative Circles - Cores verdes mais presentes no fundo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-72 sm:size-110 md:size-150 lg:size-200 bg-[#80bea6]/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
            <div className="absolute top-10 right-0 size-64 sm:size-96 bg-[#80bea6]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 size-64 sm:size-96 bg-[#80bea6]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Floating Cards - Salto rápido (0.6s) se destacando no fundo ligeiramente mais escuro */}
            <div className="hidden lg:block pointer-events-none select-none">
                <div className="absolute top-[15%] left-[12%] xl:left-[18%] rotate-12 bg-white rounded-2xl p-3 shadow-md border border-[#80bea6]/40 animate-[bounce_0.6s_infinite]">
                    <div className="text-[#80bea6]"><IconShield /></div>
                </div>
                <div className="absolute top-[20%] right-[15%] xl:right-[22%] -rotate-6 bg-white rounded-2xl p-3 shadow-md border border-[#80bea6]/40 animate-[bounce_0.6s_infinite] [animation-delay:0.1s]">
                    <div className="text-[#80bea6]"><IconHome /></div>
                </div>
                <div className="absolute bottom-[25%] left-[15%] xl:left-[20%] rotate-6 bg-white rounded-2xl p-3 shadow-md border border-[#80bea6]/40 animate-[bounce_0.6s_infinite] [animation-delay:0.2s]">
                    <div className="text-[#80bea6]"><IconMessage /></div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12 relative z-10">
                <div className={`max-w-2xl w-full text-center transition-all cubic-bezier(0.4, 0, 0.2, 1) duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

                    {/* 404 Text - Círculo de fundo com opacidade ajustada para o novo contraste */}
                    <div className="relative mb-6 sm:mb-8 inline-block select-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-48 sm:size-64 md:size-80 bg-[#80bea6] rounded-full opacity-30" />
                        <h1 className="text-[90px] sm:text-[140px] md:text-[180px] lg:text-[220px] font-bold text-[#80bea6] leading-none relative tracking-tighter drop-shadow-sm">
                            404
                        </h1>
                    </div>

                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#191c1b] mb-3 sm:mb-4 px-2">
                        Página não encontrada
                    </h2>

                    <p className="text-sm sm:text-base md:text-lg text-[#404944] mb-8 sm:mb-10 max-w-md md:max-w-lg mx-auto leading-relaxed text-balance px-4">
                        Desculpe, o ecrã que procura não existe ou foi movido. Verifique o endereço ou volte ao seu painel administrativo.
                    </p>
                </div>
            </main>

            {/* Footer Badge - Botão quase quadrado (rounded-md) com excelente destaque sobre o fundo */}
            <footer className="relative z-10 pb-6 sm:pb-8 pt-2">
                <div className="flex justify-center px-4">
                    <button
                        onClick={handleHomePage}
                        className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-white rounded-md border border-[#80bea6]/40 shadow-sm transition-all duration-200 hover:bg-[#80bea6] hover:border-[#80bea6] hover:shadow-lg hover:shadow-[#80bea6]/25 active:scale-[0.97] cursor-pointer w-full sm:w-auto justify-center"
                    >
                        <div className="size-2 bg-[#80bea6] rounded-full transition-colors duration-200 group-hover:bg-white shrink-0" />
                        <span className="text-xs font-bold text-[#404944] tracking-wider transition-colors duration-200 group-hover:text-white whitespace-nowrap">
                            VOLTAR SISTEMA DE GESTÃO
                        </span>
                    </button>
                </div>
            </footer>
        </div>
    );
}