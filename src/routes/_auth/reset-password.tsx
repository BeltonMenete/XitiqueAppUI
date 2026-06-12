import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { PasswordInput } from '#/components/PasswordInput';
import { LOGIN_SUBMIT_DELAY, ANIMATION_DURATION, APP_NAME } from '#/lib/constants';
import { Ring2 } from 'ldrs/react';

export const Route = createFileRoute('/_auth/reset-password')({
    component: ResetPassword,
});

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, LOGIN_SUBMIT_DELAY));
        setIsLoading(false);
        setIsSubmitted(true);
    };

    return (
        <div className='login-bg min-h-screen flex items-center justify-center p-4 overflow-hidden'>
            <div className='relative w-full max-w-5xl'>
                {/* Left image */}
                <div className='hidden lg:block absolute inset-y-0 -left-8 w-3/5 rounded-3xl overflow-hidden'>
                    <img src='/xitique-left-panel.avif' alt='Promo' className='w-full h-full object-cover' />
                </div>

                {/* Right card */}
                <div className='relative lg:ml-auto lg:w-1/2 bg-white rounded-3xl shadow-xl p-8 lg:p-12'>
                    <div className='w-full max-w-md mx-auto space-y-6'>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-2.5'>
                                <img src='/xitique-logo.svg' alt={APP_NAME} width={40} height={40} className='w-10 h-10' />
                                <span className='text-3xl font-semibold text-gray-900'>{APP_NAME}</span>
                            </div>
                        </div>

                        {!isSubmitted ? (
                            <div className='space-y-6'>
                                <div>
                                    <h1 className='text-3xl font-semibold text-gray-900 mb-2'>Redefinir Senha</h1>
                                    <p className='text-gray-600 text-center'>Crie uma nova senha segura para sua conta</p>
                                </div>

                                <form onSubmit={handleSubmit} noValidate className='space-y-4'>
                                    <div className='space-y-2'>
                                        <PasswordInput
                                            value={password}
                                            onChange={setPassword}
                                            showPassword={showPassword}
                                            onToggleShow={() => setShowPassword(!showPassword)}
                                        />
                                    </div>

                                    <div className='space-y-2'>
                                        <PasswordInput
                                            value={confirmPassword}
                                            onChange={setConfirmPassword}
                                            showPassword={showConfirmPassword}
                                            onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
                                        />
                                    </div>

                                    <button className='w-full py-4 rounded-2xl text-white font-semibold text-lg bg-(--color-mint-leaf-500) hover:bg-(--color-mint-leaf-600) transition-colors shadow-lg disabled:opacity-70 cursor-pointer'>
                                        {isLoading ? (
                                            <div className='flex items-center justify-center gap-2'>
                                                <Ring2
                                                    size='18'
                                                    stroke='3'
                                                    strokeLength='0.20'
                                                    bgOpacity='0.1'
                                                    speed='0.4'
                                                    color='white'
                                                />
                                                A Redefinir...
                                            </div>
                                        ) : (
                                            <span>Redefinir Senha</span>
                                        )}
                                    </button>
                                </form>

                                <div className='text-center'>
                                    <a href='/login' className='text-sm text-(--color-sky-blue-600) font-medium hover:underline'>
                                        ← Voltar para Login
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className='space-y-6 text-center'>
                                <div className='w-16 h-16 mx-auto bg-(--color-mint-leaf-100) rounded-full flex items-center justify-center'>
                                    <span className='text-3xl text-(--color-mint-leaf-600)'>✓</span>
                                </div>

                                <div>
                                    <h2 className='text-2xl font-semibold text-gray-900 mb-2'>Senha Redefinida!</h2>
                                    <p className='text-gray-600 mb-4'>Sua senha foi redefinida com sucesso.</p>
                                    <p className='text-sm text-gray-500 leading-relaxed'>
                                        Pode agora iniciar sessão com sua nova senha.
                                    </p>
                                </div>

                                <a
                                    href='/login'
                                    className='w-full py-4 rounded-2xl text-white font-semibold text-lg bg-(--color-mint-leaf-500) hover:bg-(--color-mint-leaf-600) transition-colors shadow-lg cursor-pointer inline-block text-center'
                                >
                                    Ir para Login
                                </a>

                                <div>
                                    <a href='/login' className='text-sm text-(--color-sky-blue-600) font-medium hover:underline'>
                                        ← Voltar para Login
                                    </a>
                                </div>
                            </div>
                        )}

                        <p className='text-center text-xs text-gray-500 pt-2'>
                            © {new Date().getFullYear()} Xitique. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
