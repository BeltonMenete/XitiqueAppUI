import React, { useState } from 'react';
import { ShieldCheck, Lock, CreditCard, Info, Send } from 'lucide-react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/organization/_auth/payments/bank-payment')({
  component: RouteComponent,
});

function RouteComponent() {
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    saveCard: false,
  });

  const [errors, setErrors] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(' ') : '';
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)} / ${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    let formattedValue = value;

    if (typeof value === 'string') {
      if (field === 'cardNumber') {
        formattedValue = formatCardNumber(value.replace(/\D/g, '').slice(0, 16));
      } else if (field === 'expiry') {
        formattedValue = formatExpiry(value).slice(0, 7);
      } else if (field === 'cvv') {
        formattedValue = value.replace(/\D/g, '').slice(0, 4);
      }
    }

    setFormData((prev) => ({ ...prev, [field]: formattedValue }));

    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = { cardName: '', cardNumber: '', expiry: '', cvv: '' };
    let isValid = true;

    if (!formData.cardName.trim()) {
      newErrors.cardName = 'Nome no cartão é obrigatório';
      isValid = false;
    }

    if (formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Número de cartão inválido';
      isValid = false;
    }

    if (formData.expiry.length < 7) {
      newErrors.expiry = 'Data inválida';
      isValid = false;
    }

    if (formData.cvv.length < 3) {
      newErrors.cvv = 'CVV inválido';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Processing payment...', formData);
    }
  };

  return (
    <div className='min-h-screen w-full flex bg-[#f8faf6] text-[#191c1b] overflow-y-auto'>
      <div className='flex w-full min-h-screen flex-col lg:flex-row'>
        {/* Painel Esquerdo - Branding */}
        <section className='w-full lg:w-[42%] bg-[#003527] text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden shrink-0 lg:min-h-screen'>
          {/* Capulana / Textura sutil de fundo */}
          <div
            className='absolute inset-0 opacity-5 pointer-events-none'
            style={{
              backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          <div className='relative z-10 flex items-center gap-3 mb-12 lg:mb-0'>
            <div className='bg-[#064e3b] p-2.5 rounded-xl border border-white/5'>
              {/* Xitique icon <Landmark className='h-6 w-6 text-white' /> */}
            </div>
            <span className='text-xl font-bold tracking-tight font-sans'>Xitique</span>
          </div>

          <div className='relative z-10 space-y-4 my-auto max-w-sm py-8 lg:py-0'>
            <h1 className='text-3xl xl:text-4xl font-bold leading-tight font-sans text-white'>
              Pagamento via Cartão
            </h1>
            <p className='text-[#80bea6]/90 text-sm leading-relaxed'>
              Finalize sua assinatura para começar a gerenciar seus ciclos mensais de Xitique com total transparência e
              segurança.
            </p>
          </div>

          <div className='relative z-10 space-y-3 mt-auto lg:mt-0 w-full'>
            <div className='border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl p-5 space-y-5'>
              <div className='flex items-start gap-3.5'>
                <ShieldCheck className='text-[#F59E0B] h-5 w-5 flex-shrink-0 mt-0.5' />
                <div>
                  <p className='font-bold text-sm text-white mb-0.5'>Segurança Nível Bancário</p>
                  <p className='text-[#80bea6]/80 text-xs leading-relaxed'>
                    Seus dados são criptografados de ponta a ponta e nunca armazenados em nossos servidores.
                  </p>
                </div>
              </div>

              <div className='border-t border-white/10 pt-4 flex items-start gap-3.5'>
                <Lock className='text-[#F59E0B] h-5 w-5 flex-shrink-0 mt-0.5' />
                <div>
                  <p className='font-bold text-sm text-white mb-0.5'>Processamento Stripe</p>
                  <p className='text-[#80bea6]/80 text-xs leading-relaxed'>
                    Utilizamos a infraestrutura líder mundial para garantir transações sem falhas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Elemento Gráfico Inferior */}
          <div className='absolute bottom-0 left-0 right-0 h-[25%] opacity-10 mix-blend-overlay pointer-events-none'>
            <svg
              className='w-full h-full'
              viewBox='0 0 400 200'
              preserveAspectRatio='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M0,150 Q100,80 200,130 T400,90 L400,200 L0,200 Z' fill='#ffffff' />
            </svg>
          </div>
        </section>

        {/* Painel Direito - Formulário */}
        <section className='w-full lg:w-[58%] flex items-center justify-center p-6 sm:p-12 md:p-16 bg-white lg:min-h-screen overflow-y-visible'>
          <div className='w-full max-w-md mx-auto py-2'>
            <header className='mb-8'>
              <h2 className='text-2xl sm:text-3xl font-bold text-black mb-2 tracking-tight font-sans'>
                Pagamento Seguro com Cartão
              </h2>
              <p className='text-sm text-gray-500'>Insira os dados do seu cartão de crédito ou débito abaixo.</p>
            </header>

            <form onSubmit={handleSubmit} className='space-y-5'>
              {/* Nome no Cartão */}
              <div>
                <label className='block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2'>
                  Nome no Cartão
                </label>
                <input
                  type='text'
                  value={formData.cardName}
                  onChange={(e) => handleInputChange('cardName', e.target.value)}
                  placeholder='Ex: Nome Completo'
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none bg-[#f8faf6]
                    ${errors.cardName
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                      : 'border-[#bfc9c3] hover:border-gray-400 focus:border-[#003527] focus:bg-white focus:ring-2 focus:ring-[#eceeeb]'
                    }`}
                />
                {errors.cardName && <p className='text-red-500 text-xs mt-1.5'>{errors.cardName}</p>}
              </div>

              {/* Número do Cartão */}
              <div>
                <label className='block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2'>
                  Número do Cartão
                </label>
                <div className='relative'>
                  <CreditCard className='absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
                  <input
                    type='text'
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    placeholder='0000 0000 0000 0000'
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm font-medium tracking-wider transition-all outline-none bg-[#f8faf6]
                      ${errors.cardNumber
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                        : 'border-[#bfc9c3] hover:border-gray-400 focus:border-[#003527] focus:bg-white focus:ring-2 focus:ring-[#eceeeb]'
                      }`}
                  />

                  {/* PLACEHOLDER: Insira o link da imagem do logotipo da bandeira do cartão ou dinâmico aqui */}
                  {/* <div className='absolute right-4 top-1/2 -translate-y-1/2 flex items-center'>
                    <img
                      src="SEU_LINK_AQUI"
                      alt="Card Flag Logo"
                      className='h-5 w-auto object-contain'
                    />
                  </div> 
                  */}
                </div>
                {errors.cardNumber && <p className='text-red-500 text-xs mt-1.5'>{errors.cardNumber}</p>}
              </div>

              {/* Validade e CVV */}
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2'>
                    Validade
                  </label>
                  <input
                    type='text'
                    value={formData.expiry}
                    onChange={(e) => handleInputChange('expiry', e.target.value)}
                    placeholder='MM / AA'
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium tracking-wider transition-all outline-none bg-[#f8faf6]
                      ${errors.expiry
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                        : 'border-[#bfc9c3] hover:border-gray-400 focus:border-[#003527] focus:bg-white focus:ring-2 focus:ring-[#eceeeb]'
                      }`}
                  />
                  {errors.expiry && <p className='text-red-500 text-xs mt-1.5'>{errors.expiry}</p>}
                </div>

                <div>
                  <label className='block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2'>
                    CVV
                  </label>
                  <div className='relative'>
                    <input
                      type='text'
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      placeholder='123'
                      className={`w-full px-4 py-3 pr-10 rounded-xl border text-sm font-medium tracking-wider transition-all outline-none bg-[#f8faf6]
                        ${errors.cvv
                          ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                          : 'border-[#bfc9c3] hover:border-gray-400 focus:border-[#003527] focus:bg-white focus:ring-2 focus:ring-[#eceeeb]'
                        }`}
                    />
                    <button
                      type='button'
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-150'
                      title='Código de 3 ou 4 dígitos no verso do cartão'
                    >
                      <Info className='h-4 w-4' />
                    </button>
                  </div>
                  {errors.cvv && <p className='text-red-500 text-xs mt-1.5'>{errors.cvv}</p>}
                </div>
              </div>

              {/* Checkbox Salvar Cartão */}
              <div className='flex items-center gap-3 pt-1 group w-max'>
                <input
                  type='checkbox'
                  id='saveCard'
                  checked={formData.saveCard}
                  onChange={(e) => handleInputChange('saveCard', e.target.checked)}
                  className='w-4 h-4 rounded border-gray-300 text-[#10B981] focus:ring-2 focus:ring-[#10B981] focus:ring-offset-0 cursor-pointer transition-all'
                />
                <label
                  htmlFor='saveCard'
                  className='text-xs text-gray-600 group-hover:text-gray-900 cursor-pointer select-none transition-colors duration-150'
                >
                  Salvar este cartão para pagamentos futuros.
                </label>
              </div>

              {/* Botão de Submissão Sem Sombras */}
              <button
                type='submit'
                className='w-full bg-[#10B981] hover:bg-emerald-600 text-white font-bold text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.985] focus:outline-none focus:ring-2 focus:ring-[#eceeeb]'
              >
                Finalizar e Pagar com Segurança
                <Send className='h-4 w-4' />
              </button>
            </form>

            {/* Rodapé e Stripe Info */}
            <footer className='mt-8 space-y-4 border-t border-gray-100 pt-6'>
              <div className='flex items-center justify-center gap-2 text-gray-400 text-xs'>
                <span>Powered by</span>
                <span className='font-bold text-gray-600 tracking-tight text-sm'>stripe</span>
              </div>
            </footer>
          </div>
        </section>
      </div>
    </div>
  );
}
