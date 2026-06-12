import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { EmailInput } from '#/components/EmailInput';
import { PasswordInput } from '#/components/PasswordInput';
import { FormError } from '#/components/FormError';
import { LOGIN_SUBMIT_DELAY, ANIMATION_DURATION, APP_NAME } from '#/lib/constants';
import { Ring2 } from 'ldrs/react';

export const Route = createFileRoute('/_auth/signup')({
  component: Signup,
});

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, LOGIN_SUBMIT_DELAY));
    setIsLoading(false);
  };
  return (
    <div className='login-bg min-h-screen flex items-center justify-center p-4 overflow-hidden'>
      <div className='relative w-full max-w-5xl'>
        {/* Left image */}
        <div className='hidden lg:block absolute inset-y-0 -left-8 w-3/5 rounded-3xl overflow-hidden'>
          <img
            src='/xitique-left-panel.avif'
            alt='Promo'
            className='w-full h-full object-cover'
          />
        </div>

        {/* Right card */}
        <div className='relative lg:ml-auto lg:w-1/2 bg-white rounded-3xl shadow-xl p-8 lg:p-12'>
          <div className='w-full max-w-md mx-auto space-y-2'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-2.5'>
                <img
                  src='/xitique-logo.svg'
                  alt={APP_NAME}
                  width={40}
                  height={40}
                  className='w-10 h-10'
                />
                <span className='text-3xl font-semibold text-gray-900'>{APP_NAME}</span>
              </div>
            </div>

            <div>
              <h1 className='text-3xl font-semibold text-gray-900 mb-1'>Criar Conta</h1>
              <p className='text-gray-600 '>Registe-se para começar</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className='space-y-2'>
              <div className='space-y-2'>
                <EmailInput value={email} onChange={setEmail} />
                {errors.email && <FormError message={errors.email} />}
              </div>

              <div className='space-y-2'>
                <PasswordInput
                  value={password}
                  onChange={setPassword}
                  showPassword={showPassword}
                  onToggleShow={() => setShowPassword(!showPassword)}
                />
                {errors.password && <FormError message={errors.password} />}
              </div>

              <div className='space-y-2'>
                <PasswordInput
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  showPassword={showConfirmPassword}
                  onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
                  label='Confirmar palavra-passe'
                />
              </div>

              <div className='flex items-center gap-3 pt-2'>
                <input
                  type='checkbox'
                  id='terms'
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className='w-4 h-4 rounded cursor-pointer border border-gray-300'
                />
                <label htmlFor='terms' className='text-sm text-gray-600 cursor-pointer'>
                  Concordo com os{' '}
                  <a href='/terms' className='text-(--color-sky-blue-600) font-medium hover:underline'>
                    termos e condições
                  </a>
                </label>
              </div>

              {errors.terms && <FormError message={errors.terms} />}

              <button
                type='submit'
                disabled={isLoading}
                className='w-full py-4 rounded-2xl text-white font-semibold text-lg bg-(--color-mint-leaf-500) hover:bg-(--color-mint-leaf-600) transition-colors shadow-lg disabled:opacity-70 cursor-pointer'
              >
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
                    A Criar conta...
                  </div>
                ) : (
                  <span>Criar Conta</span>
                )}
              </button>
            </form>

            <div className='text-center'>
              <p className='text-gray-600 text-sm'>
                Já possui uma conta?{' '}
                <a
                  href='/login'
                  className='text-(--color-sky-blue-600) font-medium hover:underline'
                >
                  Iniciar sessão
                </a>
              </p>
            </div>

            <p className='text-center text-xs text-gray-500 pt-2'>
              © {new Date().getFullYear()} Xitique. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
