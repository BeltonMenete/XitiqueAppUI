import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { User, Mail, Lock, ArrowRight, ArrowLeft, Shield, Landmark } from 'lucide-react';

export const Route = createFileRoute('/organization/_auth/step-2')({
    component: StepTwo,
});

function StepTwo() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nomeResponsavel: '',
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Step 2 data:', form);
        navigate({ to: '/organization/step-3' });
    };

    return (
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
            <div className='w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-gray-50/50 h-full overflow-x-hidden overflow-y-auto'>
                <div className='w-full max-w-md my-auto'>
                    {/* Stepper */}
                    <div className='flex justify-between items-center mb-1.5'>
                        <span className='text-xs font-bold text-emerald-700 tracking-wider'>PASSO 2 DE 5</span>
                        <span className='text-xs text-gray-500 font-medium'>Conta do Responsável</span>
                    </div>
                    <div className='w-full bg-gray-200 rounded-full h-1.5 mb-5'>
                        <div
                            className='bg-emerald-500 h-1.5 rounded-full transition-all duration-300'
                            style={{ width: '40%' }}
                        ></div>
                    </div>

                    <h2 className='text-2xl font-bold text-gray-900 mb-1'>Configurar Acesso</h2>
                    <p className='text-sm text-gray-500 mb-5'>Insira os dados da pessoa responsável pela gestão da conta.</p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        {/* Campo: Nome Completo do Responsável */}
                        <div className='group'>
                            <label className='block text-xs font-semibold text-gray-700 mb-1.5 group-focus-within:text-emerald-700 transition-colors'>
                                Nome Completo do Responsável
                            </label>
                            <div className='relative'>
                                <User className='absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-emerald-600 transition-colors' />
                                <input
                                    type='text'
                                    value={form.nomeResponsavel}
                                    onChange={(e) => setForm({ ...form, nomeResponsavel: e.target.value })}
                                    placeholder='Ex: Amílcar Alface'
                                    className='w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-white hover:border-gray-400 focus:hover:border-emerald-500 transition-all duration-200'
                                    required
                                />
                            </div>
                        </div>

                        {/* Campo: Email */}
                        <div className='group'>
                            <label className='block text-xs font-semibold text-gray-700 mb-1.5 group-focus-within:text-emerald-700 transition-colors'>Email</label>
                            <div className='relative'>
                                <Mail className='absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-emerald-600 transition-colors' />
                                <input
                                    type='email'
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder='exemplo@xitique.co.mz'
                                    className='w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-white hover:border-gray-400 focus:hover:border-emerald-500 transition-all duration-200'
                                    required
                                />
                            </div>
                        </div>

                        {/* Campo: Palavra-passe */}
                        <div className='group'>
                            <label className='block text-xs font-semibold text-gray-700 mb-1.5 group-focus-within:text-emerald-700 transition-colors'>Palavra-passe</label>
                            <div className='relative'>
                                <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-emerald-600 transition-colors' />
                                <input
                                    type='password'
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    placeholder='••••••••'
                                    minLength={8}
                                    className='w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-white hover:border-gray-400 focus:hover:border-emerald-500 transition-all duration-200'
                                    required
                                />
                            </div>
                        </div>

                        {/* Navigation Actions */}
                        <div className='grid grid-cols-3 gap-3 pt-2'>
                            <button
                                type='button'
                                onClick={() => navigate({ to: '/organization/step-1' })}
                                className='col-span-1 border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm text-gray-600 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-1 transition-all duration-200 text-sm active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2'
                            >
                                <ArrowLeft className='h-4 w-4' /> Voltar
                            </button>

                            <button
                                type='submit'
                                className='col-span-2 bg-emerald-600 hover:bg-emerald-700 hover:shadow-md text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2'
                            >
                                Próximo <ArrowRight className='h-4 w-4' />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}