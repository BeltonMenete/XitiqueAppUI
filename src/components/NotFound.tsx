import React, { useState, useEffect } from 'react';

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

const IconArrowLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
    </svg>
);

export default function NotFoundPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDashboard = () => window.location.href = '/dashboard';
    const handleSupport = () => window.location.href = '/suporte';

    return (
        <div className="min-h-screen bg-[#FBF8F3] relative overflow-hidden flex flex-col">
            {/* Background Grid */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(10, 72, 52, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(10, 72, 52, 0.04) 1px, transparent 1px)
          `,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Decorative Circles - usando size-* da v3.4 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] md:size-[800px] bg-[#0A4834]/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-20 right-0 size-96 bg-[#0A4834]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 size-96 bg-[#0A4834]/5 rounded-full blur-3xl" />

            {/* Floating Cards - Hidden on mobile */}
            <div className="hidden lg:block">
                <div className="absolute top-32 left-[15%] rotate-12 bg-white rounded-2xl p-3 shadow-lg border border-[#0A4834]/10 animate-bounce">
                    <div className="text-[#0A4834]"><IconShield /></div>
                </div>
                <div className="absolute top-1/4 right-[20%] -rotate-6 bg-white rounded-2xl p-3 shadow-lg border border-[#0A4834]/10 animate-bounce delay-150">
                    <div className="text-[#0A4834]"><IconHome /></div>
                </div>
                <div className="absolute bottom-1/3 left-[18%] rotate-6 bg-white rounded-2xl p-3 shadow-lg border border-[#0A4834]/10 animate-bounce delay-300">
                    <div className="text-[#0A4834]"><IconMessage /></div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
                <div className={`max-w-2xl w-full text-center transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

                    {/* 404 Text */}
                    <div className="relative mb-8 inline-block">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-64 md:size-80 bg-[#0A4834] rounded-full opacity-10" />
                        <h1 className="text-[120px] md:text-[180px] lg:text-[220px] font-bold text-[#0A4834] leading-none relative">
                            404
                        </h1>
                    </div>

                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Página não encontrada
                    </h2>

                    {/* text-balance é novo na v3.4 */}
                    <p className="text-base md:text-lg text-gray-600 mb-10 max-w-lg mx-auto leading-relaxed text-balance">
                        Desculpe, o ecrã que procura não existe ou foi movido. Verifique o endereço ou volte ao seu painel administrativo.
                    </p>


                </div>
            </main>

            {/* Footer Badge com "SITEMA DE GESTÃO" */}
            <footer className="relative z-10 pb-8 pt-4">
                <div className="flex justify-center">
                    <button
                        onClick={() => window.location.href = '/sistema-gestao'}
                        className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-[#0A4834]/10 shadow-sm transition-all duration-200 hover:bg-[#0A4834] hover:border-[#0A4834] hover:shadow-lg hover:shadow-[#0A4834]/25 active:scale-[0.97] cursor-pointer"
                    >
                        <div className="size-2 bg-[#0A4834] rounded-full transition-colors duration-200 group-hover:bg-white" />
                        <span className="text-xs font-semibold text-[#0A4834] tracking-wider transition-colors duration-200 group-hover:text-white">
                            VOLTAR SISTEMA DE GESTÃO
                        </span>
                    </button>
                </div>
            </footer>
        </div>
    );
}
