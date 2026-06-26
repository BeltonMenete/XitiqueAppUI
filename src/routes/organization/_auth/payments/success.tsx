import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
    CheckCircle,
    Verified,
    Info,
    ArrowRight,
    Download,
} from 'lucide-react';

export const Route = createFileRoute('/organization/_auth/payments/success')({
    component: RouteComponent,
});

function RouteComponent() {
    // Handler para download do recibo
    const handleDownloadReceipt = () => {
        console.log('A descarregar recibo...');
    };

    return (
        <div className='h-screen w-full flex bg-[#f8faf6] text-[#191c1b] lg:overflow-hidden overflow-y-auto font-sans selection:bg-[#b0f0d6]'>
            <div className='flex w-full h-full flex-col lg:flex-row'>

                {/* ================= PAINEL ESQUERDO: BRANDING & CONTEXTO ================= */}
                <section className='w-full lg:w-[40%] bg-[#003527] text-white p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden shrink-0 h-auto lg:h-full'>
                    {/* Textura Capulana Sutil baseada no Design System */}
                    <div
                        className='absolute inset-0 opacity-5 pointer-events-none'
                        style={{
                            backgroundImage: 'radial-gradient(#064e3b 2px, transparent 2px)',
                            backgroundSize: '24px 24px',
                        }}
                    />

                    {/* Logo Header simplificado */}
                    <div className='relative z-10 flex items-center gap-3 mb-8 lg:mb-0'>
                        <span className='text-xl font-bold tracking-tight font-sans select-none'>Xitique</span>
                    </div>

                    {/* Conteúdo Central */}
                    <div className='relative z-10 space-y-3 my-auto max-w-sm py-4 lg:py-0'>
                        <div className='h-1 w-12 bg-[#10B981] rounded-full'></div>
                        <p className='text-[#80bea6]/90 text-sm leading-relaxed'>
                            A segurança dos seus fundos é a nossa prioridade. Cada cêntimo ticado é um passo firme em direção à prosperidade da sua comunidade.
                        </p>
                    </div>

                    {/* Grid de slots decorativo do Xitique Card no fundo */}
                    <div className='absolute bottom-6 -right-15 opacity-10 rotate-12 pointer-events-none hidden lg:block'>
                        <div className='grid grid-cols-6 gap-2 p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20'>
                            {Array.from({ length: 30 }).map((_, i) => (
                                <div key={i} className='w-6 h-6 rounded-sm bg-white' />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ================= PAINEL DIREITO: CONFIRMAÇÃO & RECIBO (TEXTOS EM PRETO) ================= */}
                <section className='w-full lg:w-[60%] flex items-center justify-center p-4 sm:p-8 md:p-12 bg-[#F8FAFC] h-full lg:overflow-y-auto'>
                    <div className='w-full max-w-xl mx-auto my-auto space-y-5 text-center lg:text-left'>

                        {/* Cabeçalho de Sucesso */}
                        <div className='space-y-2'>
                            <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#10B981]/10 text-[#10B981] mb-2 lg:mb-0'>
                                <CheckCircle className='h-10 w-10' />
                            </div>
                            {/* Alterado para text-black puro */}
                            <h2 className='text-2xl sm:text-3xl font-black text-black tracking-tight font-sans'>
                                Pagamento Confirmado!
                            </h2>
                            {/* Ajustado para text-black com opacidade sutil */}
                            <p className='text-sm text-black/70 font-medium leading-relaxed max-w-md mx-auto lg:mx-0'>
                                A sua organização já está activa e pronta para começar a ticar. Bem-vindo à nova era da gestão financeira comunitária em Moçambique.
                            </p>
                        </div>

                        {/* Card do Recibo Tátil - Snappy & Smooth */}
                        <div className='bg-white border border-[#bfc9c3]/40 rounded-xl p-5 shadow-sm space-y-4 relative overflow-hidden cursor-pointer transition-all duration-100 ease-in-out hover:shadow-[0_2px_8px_rgba(0,0,0,0.015)] hover:scale-[1.005] hover:border-black/30'>
                            <div className='flex justify-between items-center border-b border-[#e7e9e5] pb-3'>
                                <div className='text-left'>
                                    <span className='text-[10px] font-bold text-black/40 uppercase tracking-widest block'>
                                        Recibo de Transação
                                    </span>
                                    {/* Alterado para text-black */}
                                    <h3 className='text-base font-bold text-black mt-0.5'>Plano Premium Mensal</h3>
                                </div>
                                {/* Alterado para text-black */}
                                <Verified className='text-black h-6 w-6 shrink-0' />
                            </div>

                            {/* Informações da Transação */}
                            <div className='grid grid-cols-2 gap-4 text-left'>
                                <div className='space-y-0.5'>
                                    <p className='text-[10px] font-semibold uppercase tracking-wider text-black/40'>Número da Transação</p>
                                    {/* Alterado para text-black */}
                                    <p className='font-mono text-xs font-medium text-black'>#XM-2024-998102</p>
                                </div>
                                <div className='space-y-0.5'>
                                    <p className='text-[10px] font-semibold uppercase tracking-wider text-black/40'>Próxima Cobrança</p>
                                    {/* Alterado para text-black */}
                                    <p className='text-xs font-bold text-black'>15 de Julho, 2024</p>
                                </div>
                                <div className='space-y-0.5'>
                                    <p className='text-[10px] font-semibold uppercase tracking-wider text-black/40'>Valor Pago</p>
                                    <p className='text-lg font-bold text-[#10B981]'>1.500,00 MZN</p>
                                </div>
                                <div className='space-y-0.5'>
                                    <p className='text-[10px] font-semibold uppercase tracking-wider text-black/40'>Estado</p>
                                    <span className='inline-flex items-center gap-1 bg-[#10B981]/5 text-[#10B981] px-2 py-0.5 rounded-full text-[10px] font-bold border border-[#10B981]/20'>
                                        <span className='w-1.5 h-1.5 rounded-full bg-[#10B981]'></span>
                                        ATIVO
                                    </span>
                                </div>
                            </div>

                            {/* Linha Divisória de Segurança */}
                            <div className='border-t border-dashed border-[#707974]/30 pt-3'>
                                <div className='flex items-center gap-2 text-black/70 bg-[#f2f4f1] p-2.5 rounded-lg text-left'>
                                    {/* Alterado para text-black */}
                                    <Info className='h-4 w-4 text-black shrink-0' />
                                    <p className='text-[11px] font-medium leading-tight'>Uma cópia deste recibo foi enviada para o seu email registado.</p>
                                </div>
                            </div>
                        </div>

                        {/* Ações / Botões Principais - Snappy & Smooth */}
                        <div className='flex flex-col sm:flex-row gap-3 pt-2 max-w-md mx-auto lg:mx-0'>
                            <button
                                type='button'
                                className='flex-1 bg-[#10B981] hover:bg-emerald-600 text-white font-bold text-xs py-3 px-5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-all duration-100 ease-in-out active:scale-[0.995]'
                            >
                                Ir para o Painel de Controlo
                                <ArrowRight className='h-3.5 w-3.5' />
                            </button>

                            <button
                                type='button'
                                onClick={handleDownloadReceipt}
                                // Customizado com texto e hover em preto/cinza-escuro puro
                                className='flex-1 border border-[#bfc9c3] text-black font-bold text-xs py-3 px-5 rounded-xl flex items-center justify-center gap-1.5 bg-transparent cursor-pointer transition-all duration-100 ease-in-out hover:bg-[#eceeeb] hover:border-black active:scale-[0.995]'
                            >
                                <Download className='h-3.5 w-3.5' />
                                Recibo (PDF)
                            </button>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    );
}