import { useState } from 'react';
import { ShieldCheck, Lock, CreditCard, Info, Send, Loader2 } from 'lucide-react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/organization/_auth/payments/bank')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    saveCard: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Formatações de Input
  const formatCardNumber = (value: string) =>
    value
      .replace(/\D/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, '');
    return v.length >= 2 ? `${v.slice(0, 2)} / ${v.slice(2, 4)}` : v;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    let formattedValue = value;
    if (typeof value === 'string') {
      if (field === 'cardNumber') formattedValue = formatCardNumber(value).slice(0, 19);
      if (field === 'expiry') formattedValue = formatExpiry(value).slice(0, 7);
      if (field === 'cvv') formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }
    setFormData((prev) => ({ ...prev, [field]: formattedValue }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulação de delay de processamento
    setTimeout(() => {
      setIsProcessing(false);
      alert('Pagamento processado com sucesso!');
      // navigate({ to: '/dashboard' });
    }, 2500);
  };

  return (
    <div className='min-h-screen w-full flex bg-[#f8faf6] text-[#191c1b] font-sans'>
      <div className='flex w-full flex-col lg:flex-row'>
        {/* Painel Esquerdo - Branding e Confiança */}
        <section className='w-full lg:w-[42%] bg-[#003527] text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden'>
          <div className='relative z-10'>
            <h2 className='text-xl font-bold tracking-tight'>Xitique</h2>
            <h1 className='text-4xl font-bold mt-12 leading-tight'>Pagamento Seguro</h1>
            <p className='text-[#80bea6] mt-4 text-sm max-w-sm'>
              Finalize sua assinatura com total transparência. Seus dados estão protegidos com criptografia de
              ponta a ponta.
            </p>
          </div>

          <div className='space-y-6 z-10 mt-12'>
            <div className='flex gap-4'>
              <ShieldCheck className='text-[#F59E0B] shrink-0' />
              <div>
                <p className='font-bold text-sm'>Segurança Nível Bancário</p>
                <p className='text-[#80bea6] text-xs mt-1'>
                  Seus dados nunca são armazenados em nossos servidores.
                </p>
              </div>
            </div>
            <div className='flex gap-4 border-t border-white/10 pt-6'>
              <Lock className='text-[#F59E0B] shrink-0' />
              <div>
                <p className='font-bold text-sm'>Processamento via Stripe</p>
                <p className='text-[#80bea6] text-xs mt-1'>Infraestrutura líder mundial para pagamentos.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Painel Direito - Formulário */}
        <section className='w-full lg:w-[58%] flex items-center justify-center p-6 sm:p-16 bg-white'>
          <div className='w-full max-w-md'>
            <header className='mb-8'>
              <h2 className='text-2xl font-bold text-black'>Informações de Pagamento</h2>
              <p className='text-sm text-gray-600 mt-2'>Complete a transação abaixo.</p>
            </header>

            <form onSubmit={handleSubmit} className='space-y-5'>
              <div>
                <label className='block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5'>
                  Nome no Cartão
                </label>
                <input
                  required
                  className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all'
                  placeholder='Nome completo'
                  value={formData.cardName}
                  onChange={(e) => handleInputChange('cardName', e.target.value)}
                />
              </div>

              <div>
                <label className='block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5'>
                  Número do Cartão
                </label>
                <div className='relative'>
                  <CreditCard className='absolute left-3 top-3.5 h-4 w-4 text-gray-400' />
                  <input
                    required
                    className='w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none'
                    placeholder='0000 0000 0000 0000'
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  />
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5'>
                    Validade
                  </label>
                  <input
                    required
                    className='w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500'
                    placeholder='MM / AA'
                    value={formData.expiry}
                    onChange={(e) => handleInputChange('expiry', e.target.value)}
                  />
                </div>
                <div>
                  <label className='block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5'>
                    CVV
                  </label>
                  <input
                    required
                    className='w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500'
                    placeholder='123'
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                  />
                </div>
              </div>

              <button
                type='submit'
                disabled={isProcessing}
                className='w-full mt-4 bg-[#10B981] hover:bg-emerald-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70 active:scale-[0.98]'
              >
                {isProcessing ? <Loader2 className='animate-spin h-5 w-5' /> : 'Finalizar Pagamento'}
                {!isProcessing && <Send className='h-4 w-4' />}
              </button>
            </form>

            <footer className='mt-8 text-center'>
              <p className='text-[10px] text-gray-400'>Transação protegida por SSL e PCI DSS</p>
            </footer>
          </div>
        </section>
      </div>
    </div>
  );
}
