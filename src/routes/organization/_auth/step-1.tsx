import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Building2, ArrowRight, Shield, Landmark } from 'lucide-react';
import { PROVINCIAS_MZ } from '../../../data/mozambique';

export const Route = createFileRoute('/organization/_auth/step-1')({
  component: StepOne,
});

function StepOne() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    provincia: '',
    distrito: '',
    telefone: '',
  });

  const distritos = PROVINCIAS_MZ.find((p) => p.nome === form.provincia)?.distritos || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Step 1 data:', form);
    navigate({ to: '/organization/step-2' });
  };

  return (
    // Restricted total height to viewport height and disabled global overflow
    <div className='h-screen max-h-screen w-screen flex overflow-hidden bg-white selection:bg-emerald-900/10'>
      {/* Left Panel - Branding */}
      <div className='hidden lg:flex lg:w-1/2 bg-emerald-900 text-white p-8 xl:p-12 flex-col justify-between h-full'>
        <div className='space-y-4 my-auto'>
          <h2 className='text-2xl font-bold text-amber-400'>Xitique</h2>
          <h1 className='text-3xl xl:text-4xl font-bold leading-tight text-white'>
            Digitalize o seu Xitique com segurança e transparência.
          </h1>
          <p className='text-emerald-100 text-sm xl:text-base leading-relaxed max-w-md'>
            Modernize a gestão da sua comunidade financeira. Unimos tradição Moçambicana com a eficiência da
            tecnologia moderna.
          </p>
        </div>

        <div className='grid grid-cols-2 gap-3 mt-auto'>
          <div className='border border-emerald-700/60 bg-emerald-950/20 rounded-xl p-3.5'>
            <Shield className='text-amber-400 mb-1.5 h-5 w-5' />
            <p className='font-bold text-xs tracking-wider text-white'>SEGURANÇA TOTAL</p>
            <p className='text-emerald-300 text-xs mt-0.5'>Dados encriptados</p>
          </div>
          <div className='border border-emerald-700/60 bg-emerald-950/20 rounded-xl p-3.5'>
            <Landmark className='text-amber-400 mb-1.5 h-5 w-5' />
            <p className='font-bold text-xs tracking-wider text-white'>AUDITÁVEL</p>
            <p className='text-emerald-300 text-xs mt-0.5'>Histórico completo</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form Container */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-gray-50/50 h-full overflow-y-auto'>
        <div className='w-full max-w-md my-auto'>
          {/* Stepper atualizado para o fluxo de 5 passos */}
          <div className='flex justify-between items-center mb-1.5'>
            <span className='text-xs font-bold text-emerald-700 tracking-wider'>PASSO 1 DE 5</span>
            <span className='text-xs text-gray-500 font-medium'>Dados Iniciais</span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-1.5 mb-5'>
            <div
              className='bg-emerald-500 h-1.5 rounded-full transition-all duration-300'
              style={{ width: '20%' }}
            ></div>
          </div>

          <h2 className='text-2xl font-bold text-gray-900 mb-1'>Criar Conta da Organização</h2>
          <p className='text-sm text-gray-500 mb-5'>Comece a organizar os seus grupos financeiros hoje mesmo.</p>

          {/* Form with optimized paddings and spacing */}
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-xs font-semibold text-gray-700 mb-1.5'>Nome da Organização</label>
              <div className='relative'>
                <Building2 className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                <input
                  type='text'
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  placeholder='Ex: Cooperativa de Poupança Mavalane'
                  className='w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white'
                  required
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className='block text-xs font-semibold text-gray-700 mb-1.5'>Província</label>
                <select
                  value={form.provincia}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      provincia: e.target.value,
                      distrito: '',
                    })
                  }
                  className='w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white'
                  required
                >
                  <option value=''>Selecionar...</option>
                  {PROVINCIAS_MZ.map((p) => (
                    <option key={p.nome} value={p.nome}>
                      {p.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-xs font-semibold text-gray-700 mb-1.5'>Cidade / Distrito</label>
                <select
                  value={form.distrito}
                  onChange={(e) => setForm({ ...form, distrito: e.target.value })}
                  className='w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white disabled:bg-gray-100 disabled:text-gray-400'
                  disabled={!form.provincia}
                  required
                >
                  <option value=''>Selecionar...</option>
                  {distritos.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className='block text-xs font-semibold text-gray-700 mb-1.5'>Telefone</label>
              <div className='flex shadow-sm rounded-lg overflow-hidden'>
                <span className='inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm select-none'>
                  +258
                </span>
                <input
                  type='tel'
                  value={form.telefone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      telefone: e.target.value.replace(/\D/g, ''),
                    })
                  }
                  placeholder='84 000 0000'
                  maxLength={9}
                  pattern='[82|83|84|85|86|87][0-9]{7}'
                  className='flex-1 px-3 py-2.5 text-sm border border-gray-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-r-lg bg-white'
                  required
                />
              </div>
              <p className='text-[11px] text-gray-400 mt-1'>
                Enviaremos um código SMS para validação no passo seguinte.
              </p>
            </div>

            <button
              type='submit'
              className='w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition shadow-sm hover:shadow active:scale-[0.99] text-sm mt-2 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
            >
              Próximo <ArrowRight className='h-4 w-4' />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}