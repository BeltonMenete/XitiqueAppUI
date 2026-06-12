import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { LOGIN_SUBMIT_DELAY, ANIMATION_DURATION } from '#/lib/constants';
import { Ring2 } from 'ldrs/react';

export const Route = createFileRoute('/_auth/forgot-password')({
    component: ForgotPassword,
});

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, LOGIN_SUBMIT_DELAY));
        setIsLoading(false);
        setIsSubmitted(true);
    };

    return (
        <div className='relative w-full max-w-5xl'>
            {/* Left image */}

            {/* Right card */}

            <div className='w-full max-w-md mx-auto space-y-6'>
                {/*      <LoginHeader /> */}
                <h1 className='text-3xl font-semibold text-gray-900 mb-2'>Recuperar Senha</h1>
                <p className='text-gray-600 text-center'>Insira seu email para receber um link de recuperação</p>
                <form onSubmit={handleSubmit} noValidate className='space-y-4'>
                    <Ring2 size='18' stroke='3' strokeLength='0.20' bgOpacity='0.1' speed='0.4' color='white' />A Enviar...
                </form>
                ✓<h2 className='text-2xl font-semibold text-gray-900 mb-2'>Email Enviado!</h2>
                <p className='text-gray-600 mb-4'>Enviamos um link de recuperação para:</p>
                <p className='text-lg font-medium text-(--color-sky-blue-600) mb-6'>{email}</p>
                <p className='text-sm text-gray-500 leading-relaxed'>
                    Verifique sua caixa de entrada e siga as instruções para redefinir sua senha. Se não receber o email em
                    alguns minutos, verifique sua pasta de spam.
                </p>
            </div>
        </div>
    );
}
