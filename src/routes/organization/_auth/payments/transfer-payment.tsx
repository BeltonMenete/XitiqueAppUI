import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  Landmark,
  Info,
  Copy,
  Check,
  UploadCloud,
  ShoppingBasket,
  ArrowLeft,
  Send,
  CheckCircle2,
  X,
} from 'lucide-react';

export const Route = createFileRoute('/organization/_auth/payments/transfer-payment')({
  component: RouteComponent,
});

function RouteComponent() {
  // Estados funcionais para interações do utilizador
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);

  const bankDetails = {
    accountNumber: '12345678',
    nib: '0001 0000 1234 5678 9012 3',
  };

  // Função para copiar dados bancários
  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ''));
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Manipulador do upload de ficheiro
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      setShowModal(true);
    } else {
      alert('Por favor, anexe o comprovativo antes de finalizar.');
    }
  };

  return (
    <div className='h-screen w-full flex bg-[#f8faf6] text-[#191c1b] lg:overflow-hidden overflow-y-auto font-sans selection:bg-[#b0f0d6]'>
      <div className='flex w-full h-full flex-col lg:flex-row'>
        {/* ================= PAINEL ESQUERDO: BRANDING & CONTEXTO ================= */}
        <section className='w-full lg:w-[40%] bg-[#003527] text-white p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden shrink-0 h-auto lg:h-full'>
          {/* Textura Capulana Sutil */}
          <div
            className='absolute inset-0 opacity-5 pointer-events-none'
            style={{
              backgroundImage: 'radial-gradient(#064e3b 2px, transparent 2px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Logo Header */}
          <div className='relative z-10 flex items-center gap-3 mb-8 lg:mb-0'>
            <div className='bg-[#b0f0d6] p-2 rounded-xl flex items-center justify-center transition-transform hover:scale-105 duration-200'>
              <Landmark className='h-5 w-5 text-[#003527]' />
            </div>
            <span className='text-lg font-bold tracking-tight font-sans'>Xitique Finance</span>
          </div>

          {/* Conteúdo Central */}
          <div className='relative z-10 space-y-3 my-auto max-w-md py-4 lg:py-0'>
            <h1 className='text-2xl xl:text-3xl font-bold leading-tight text-white font-sans'>
              Transferência Bancária
            </h1>
            <p className='text-[#80bea6]/90 text-sm leading-relaxed'>
              Complete o seu registo efectuando a transferência para a conta oficial do Xitique Digital. Após o
              envio, anexe o comprovativo para activação imediata.
            </p>

            {/* Card de Instruções */}
            <div className='border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl p-4 mt-4'>
              <div className='flex items-start gap-3'>
                <Info className='text-[#b0f0d6] h-4 w-4 flex-shrink-0 mt-0.5' />
                <div>
                  <p className='font-bold text-[10px] uppercase tracking-wider text-[#b0f0d6] mb-0.5'>
                    Importante
                  </p>
                  <p className='text-white/80 text-xs leading-relaxed'>
                    Utilize o seu número de telefone ou email como referência da transferência para agilizar a
                    verificação.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Elementos Decorativos de Fundo */}
          <div className='absolute -bottom-24 -left-24 w-64 h-64 bg-[#064e3b] rounded-full opacity-20 blur-3xl pointer-events-none'></div>
          <div className='absolute -top-24 -right-24 w-96 h-96 bg-[#95d3ba] rounded-full opacity-10 blur-3xl pointer-events-none'></div>
        </section>

        {/* ================= PAINEL DIREITO: INTERAÇÃO / FORMULÁRIO ================= */}
        <section className='w-full lg:w-[60%] flex items-center justify-center p-4 sm:p-8 md:p-12 bg-[#F8FAFC] h-full lg:overflow-y-auto'>
          <div className='w-full max-w-2xl mx-auto my-auto'>
            {/* Header com Título Preto Puro */}
            <header className='mb-4'>
              <h2 className='text-xl sm:text-2xl font-bold text-black mb-1 tracking-tight font-sans'>
                Dados para Transferência
              </h2>
              <p className='text-xs text-gray-500'>
                Copie os dados abaixo e realize o pagamento através do seu banco.
              </p>
            </header>

            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* Card de Detalhes Bancários */}
              <div className='bg-white border border-[#e7e9e5] rounded-xl p-4 shadow-sm transition-all duration-200 hover:shadow-md'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {/* Banco */}
                  <div className='space-y-0.5'>
                    <label className='block text-[10px] font-semibold uppercase tracking-wider text-gray-500'>
                      Banco
                    </label>
                    <p className='text-xl font-bold text-[#10B981] font-sans'>BIM</p>
                  </div>

                  {/* Beneficiário */}
                  <div className='space-y-0.5'>
                    <label className='block text-[10px] font-semibold uppercase tracking-wider text-gray-500'>
                      Beneficiário
                    </label>
                    <p className='text-sm font-bold text-gray-800'>Xitique Digital, SA</p>
                  </div>

                  {/* Número de Conta */}
                  <div className='space-y-1 md:col-span-1'>
                    <label className='block text-[10px] font-semibold uppercase tracking-wider text-gray-500'>
                      Número de Conta
                    </label>
                    <div className='flex items-center justify-between bg-[#F1F5F9] rounded-xl px-3 py-2 transition-colors hover:bg-gray-200 group relative'>
                      <code className='font-mono text-xs font-medium text-gray-800'>
                        {bankDetails.accountNumber}
                      </code>
                      <button
                        type='button'
                        onClick={() => handleCopy(bankDetails.accountNumber, 'acc')}
                        className='text-[#003527] p-1 rounded-md hover:bg-white/80 transition-colors focus:outline-none'
                        title='Copiar Conta'
                      >
                        {copiedField === 'acc' ? (
                          <Check className='h-3.5 w-3.5 text-[#10B981]' />
                        ) : (
                          <Copy className='h-3.5 w-3.5' />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* NIB */}
                  <div className='space-y-1 md:col-span-1'>
                    <label className='block text-[10px] font-semibold uppercase tracking-wider text-gray-500'>
                      NIB
                    </label>
                    <div className='flex items-center justify-between bg-[#F1F5F9] rounded-xl px-3 py-2 transition-colors hover:bg-gray-200 group relative'>
                      <code className='font-mono text-xs font-medium text-gray-800'>{bankDetails.nib}</code>
                      <button
                        type='button'
                        onClick={() => handleCopy(bankDetails.nib, 'nib')}
                        className='text-[#003527] p-1 rounded-md hover:bg-white/80 transition-colors focus:outline-none'
                        title='Copiar NIB'
                      >
                        {copiedField === 'nib' ? (
                          <Check className='h-3.5 w-3.5 text-[#10B981]' />
                        ) : (
                          <Copy className='h-3.5 w-3.5' />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Área de Upload de Ficheiro Mais Compacta */}
              <div className='space-y-1'>
                <label className='block text-xs font-bold text-gray-800'>Anexar Comprovativo</label>
                <div
                  className={`border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center bg-white transition-all duration-200 group cursor-pointer
                  ${selectedFile
                      ? 'border-[#10B981] bg-[#10B981]/5'
                      : 'border-[#bfc9c3] hover:border-[#003527] hover:bg-[#f2f4f1]'
                    }`}
                >
                  <input
                    accept='image/*,application/pdf'
                    className='hidden'
                    id='file-upload'
                    type='file'
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor='file-upload'
                    className='flex flex-col items-center cursor-pointer w-full text-center'
                  >
                    <UploadCloud
                      className={`h-8 w-8 mb-1 transition-transform duration-200 group-hover:scale-110 
                      ${selectedFile ? 'text-[#10B981]' : 'text-gray-400'}`}
                    />
                    {selectedFile ? (
                      <div className='space-y-0.5'>
                        <p className='text-gray-900 font-medium text-xs'>✓ {selectedFile.name}</p>
                        <p className='text-[10px] text-gray-500'>Clique para substituir o ficheiro</p>
                      </div>
                    ) : (
                      <div className='space-y-0.5'>
                        <p className='text-gray-700 font-medium text-xs'>
                          Clique para carregar ou arraste o ficheiro
                        </p>
                        <p className='text-[10px] text-gray-400'>PDF, PNG ou JPG (Máx. 5MB)</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Resumo do Pedido */}
              <div className='bg-[#f2f4f1] border border-[#e7e9e5] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-[#10B981] rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm'>
                    <ShoppingBasket className='h-4 w-4' />
                  </div>
                  <div>
                    <p className='text-[10px] text-gray-500'>Plano Selecionado</p>
                    <p className='font-bold text-sm text-[#003527]'>Xitique Pro</p>
                  </div>
                </div>
                <div className='text-left sm:text-right'>
                  <p className='text-[10px] text-gray-500'>Total a Pagar</p>
                  <p className='text-xl font-bold text-[#10B981] font-sans'>
                    1.500 MZN<span className='text-xs font-normal text-gray-500'>/mês</span>
                  </p>
                </div>
              </div>

              {/* Ações / Footer Interativo */}
              <div className='flex flex-col-reverse sm:flex-row gap-3 items-center justify-between pt-1'>
                <button
                  type='button'
                  className='flex items-center gap-1.5 text-gray-500 hover:text-black transition-colors font-medium text-xs py-1.5 px-3 focus:outline-none'
                >
                  <ArrowLeft className='h-3.5 w-3.5' />
                  Voltar para Planos
                </button>

                <button
                  type='submit'
                  className='w-full sm:w-auto bg-[#10B981] hover:bg-emerald-600 text-white font-bold text-xs py-3 px-6 rounded-xl flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-[0.985] focus:outline-none focus:ring-2 focus:ring-[#eceeeb] shadow-sm'
                >
                  Finalizar e Enviar Comprovativo
                  <Send className='h-3.5 w-3.5' />
                </button>
              </div>
            </form>

            {/* Link de Suporte Extra */}
            <div className='text-center mt-6 pt-3 border-t border-gray-100'>
              <p className='text-xs text-gray-500'>
                Precisa de ajuda?{' '}
                <a href='#' className='font-bold text-[#003527] hover:underline'>
                  Contactar Suporte
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ================= MODAL DE SUCESSO ================= */}
      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200'>
          <div
            className='absolute inset-0 bg-[#003527]/40 backdrop-blur-md'
            onClick={() => setShowModal(false)}
          ></div>
          <div className='bg-white rounded-2xl p-6 max-w-sm w-full relative z-10 shadow-2xl text-center transform scale-100 transition-all'>
            <button
              onClick={() => setShowModal(false)}
              className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors'
            >
              <X className='h-5 w-5' />
            </button>
            <div className='w-16 h-16 bg-[#10B981]/10 text-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4'>
              <CheckCircle2 className='h-10 w-10' />
            </div>
            <h3 className='text-xl font-bold text-[#003527] mb-2 font-sans'>Envio efectuado!</h3>
            <p className='text-sm text-gray-500 mb-6'>
              O seu comprovativo foi recebido. Nossa equipe irá validar o pagamento em até 24 hours.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className='w-full bg-[#003527] hover:bg-[#064e3b] text-white py-3 rounded-xl font-bold text-sm transition-colors shadow-sm'
            >
              Ir para Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
