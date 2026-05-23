import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: ANIMATION_DURATION.NORMAL }}
            className='login-bg min-h-screen flex items-center justify-center p-4 overflow-hidden'
        >
            <div className='relative w-full max-w-5xl'>
                {/* Left image */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: ANIMATION_DURATION.VERY_SLOW }}
                    className='hidden lg:block absolute inset-y-0 -left-8 w-3/5 rounded-3xl overflow-hidden'
                >
                    <motion.img
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 1.5 }}
                        src='/xitique-left-panel.avif'
                        alt='Promo'
                        className='w-full h-full object-cover'
                    />
                </motion.div>

                {/* Right card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: ANIMATION_DURATION.NORMAL, delay: 0.08 }}
                    className='relative lg:ml-auto lg:w-1/2 bg-white rounded-3xl shadow-xl p-8 lg:p-12'
                >
                    <div className='w-full max-w-md mx-auto space-y-6'>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: ANIMATION_DURATION.NORMAL, delay: 0.05 }}
                            className='flex justify-between items-center'
                        >
                            <div className='flex items-center gap-2.5'>
                                <motion.img
                                    whileHover={{ rotate: 15 }}
                                    transition={{ duration: ANIMATION_DURATION.NORMAL }}
                                    src='/xitique-logo.svg'
                                    alt={APP_NAME}
                                    width={40}
                                    height={40}
                                    className='w-10 h-10'
                                />
                                <span className='text-3xl font-semibold text-gray-900'>{APP_NAME}</span>
                            </div>
                        </motion.div>

                        <AnimatePresence mode='wait'>
                            {!isSubmitted ? (
                                <motion.div
                                    key='form'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: ANIMATION_DURATION.NORMAL }}
                                    className='space-y-6'
                                >
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: ANIMATION_DURATION.NORMAL, delay: 0.08 }}
                                    >
                                        <h1 className='text-3xl font-semibold text-gray-900 mb-2'>Redefinir Senha</h1>
                                        <p className='text-gray-600 text-center'>Crie uma nova senha segura para sua conta</p>
                                    </motion.div>

                                    <form onSubmit={handleSubmit} noValidate className='space-y-4'>
                                        <motion.div layout className='space-y-2'>
                                            <PasswordInput
                                                value={password}
                                                onChange={setPassword}
                                                showPassword={showPassword}
                                                onToggleShow={() => setShowPassword(!showPassword)}
                                            />
                                        </motion.div>

                                        <motion.div layout className='space-y-2'>
                                            <PasswordInput
                                                value={confirmPassword}
                                                onChange={setConfirmPassword}
                                                showPassword={showConfirmPassword}
                                                onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
                                            />
                                        </motion.div>

                                        <motion.button
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: ANIMATION_DURATION.FAST, delay: 0.12 }}
                                            whileHover={{ scale: 1.005 }}
                                            whileTap={{ scale: 0.995 }}
                                            type='submit'
                                            disabled={isLoading}
                                            className='w-full py-4 rounded-2xl text-white font-semibold text-lg bg-(--color-mint-leaf-500) hover:bg-(--color-mint-leaf-600) transition-colors shadow-lg disabled:opacity-70 cursor-pointer'
                                        >
                                            <AnimatePresence mode='wait'>
                                                {isLoading ? (
                                                    <motion.div
                                                        key='loading'
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: ANIMATION_DURATION.FAST }}
                                                        className='flex items-center justify-center gap-2'
                                                    >
                                                        <Ring2
                                                            size='18'
                                                            stroke='3'
                                                            strokeLength='0.20'
                                                            bgOpacity='0.1'
                                                            speed='0.4'
                                                            color='white'
                                                        />
                                                        A Redefinir...
                                                    </motion.div>
                                                ) : (
                                                    <motion.span
                                                        key='text'
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: ANIMATION_DURATION.FAST }}
                                                    >
                                                        Redefinir Senha
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </motion.button>
                                    </form>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: ANIMATION_DURATION.NORMAL, delay: 0.14 }}
                                        className='text-center'
                                    >
                                        <motion.a
                                            href='/login'
                                            whileHover={{ x: -1 }}
                                            transition={{ duration: ANIMATION_DURATION.NORMAL }}
                                            className='text-sm text-(--color-sky-blue-600) font-medium hover:underline'
                                        >
                                            ← Voltar para Login
                                        </motion.a>
                                    </motion.div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key='success'
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: ANIMATION_DURATION.NORMAL }}
                                    className='space-y-6 text-center'
                                >
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 0.6, delay: 0.1 }}
                                        className='w-16 h-16 mx-auto bg-(--color-mint-leaf-100) rounded-full flex items-center justify-center'
                                    >
                                        <motion.span
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4, delay: 0.2 }}
                                            className='text-3xl text-(--color-mint-leaf-600)'
                                        >
                                            ✓
                                        </motion.span>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: ANIMATION_DURATION.NORMAL, delay: 0.2 }}
                                    >
                                        <h2 className='text-2xl font-semibold text-gray-900 mb-2'>Senha Redefinida!</h2>
                                        <p className='text-gray-600 mb-4'>Sua senha foi redefinida com sucesso.</p>
                                        <p className='text-sm text-gray-500 leading-relaxed'>
                                            Pode agora iniciar sessão com sua nova senha.
                                        </p>
                                    </motion.div>

                                    <motion.a
                                        href='/login'
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: ANIMATION_DURATION.FAST, delay: 0.3 }}
                                        whileHover={{ scale: 1.005 }}
                                        whileTap={{ scale: 0.995 }}
                                        className='w-full py-4 rounded-2xl text-white font-semibold text-lg bg-(--color-mint-leaf-500) hover:bg-(--color-mint-leaf-600) transition-colors shadow-lg cursor-pointer inline-block text-center'
                                    >
                                        Ir para Login
                                    </motion.a>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: ANIMATION_DURATION.NORMAL, delay: 0.36 }}
                                    >
                                        <motion.a
                                            href='/login'
                                            whileHover={{ x: -1 }}
                                            transition={{ duration: ANIMATION_DURATION.NORMAL }}
                                            className='text-sm text-(--color-sky-blue-600) font-medium hover:underline'
                                        >
                                            ← Voltar para Login
                                        </motion.a>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: ANIMATION_DURATION.NORMAL, delay: 0.18 }}
                            className='text-center text-xs text-gray-500 pt-2'
                        >
                            © {new Date().getFullYear()} Xitique. Todos os direitos reservados.
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
