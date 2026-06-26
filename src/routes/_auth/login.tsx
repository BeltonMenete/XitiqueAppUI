import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { EmailInput } from '#/components/EmailInput';
import { PasswordInput } from '#/components/PasswordInput';
import { FormError } from '#/components/FormError';
import { validateLoginForm } from '#/lib/validation';
import { LOGIN_SUBMIT_DELAY, APP_NAME } from '#/lib/constants';
import { Ring2 } from 'ldrs/react';
import { UserPlus } from 'lucide-react';

export const Route = createFileRoute('/_auth/login')({
  component: Login,
});

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const validation = validateLoginForm(email, password);

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, LOGIN_SUBMIT_DELAY));
    console.log('Login attempt:', { email, password });
    setIsLoading(false);
  };

  return (
    <div className='login-bg min-h-screen flex items-center justify-center p-4 overflow-hidden'>
      <div className='relative w-full max-w-4xl'>
        {/* Imagem Lateral (Desktop) */}
        <div className='hidden lg:block absolute inset-y-0 -left-6 w-3/5 rounded-2xl overflow-hidden opacity-100 translate-x-0'>
          <img src='/xitique-left-panel.avif' alt='Promo' className='w-full h-full object-cover' />
        </div>

        {/* Card do Formulário */}
        <div className='relative lg:ml-auto lg:w-1/2 bg-white rounded-2xl shadow-xl p-6 lg:p-10 min-h-125 flex flex-col justify-between transition-all duration-500 ease-in-out'>
          <div className='w-full max-w-sm mx-auto flex-1 flex flex-col justify-center space-y-5'>
            {/* Cabeçalho */}
            <div className='flex justify-between items-center mb-1'>
              <div className='flex items-center gap-2'>
                <img src='/xitique-logo.svg' alt={APP_NAME} width={32} height={32} className='w-8 h-8' />
                <span className='text-2xl font-semibold text-gray-900'>{APP_NAME}</span>
              </div>

              <Link
                to='/signup'
                className='flex items-center gap-1 text-xs font-medium text-(--color-sky-blue-600) transition-all duration-300 hover:text-(--color-sky-blue-700) hover:translate-x-[2px]'
              >
                <UserPlus size={14} /> Criar conta
              </Link>
            </div>

            <div>
              <h1 className='text-2xl font-semibold text-gray-900 mb-0.5'>Iniciar sessão</h1>
              <p className='text-gray-500 text-xs'>Aceda à sua conta corporativa.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className='flex flex-col space-y-1'>
              {/* Campo E-mail com container de erro estático */}
              <div className='flex flex-col'>
                <EmailInput value={email} onChange={setEmail} placeholder='exemplo@email.com' />
                <div className='h-5 flex items-center pl-1 mt-1.5'>
                  <div
                    className={`text-xs transition-opacity duration-150 ${errors.email ? 'opacity-100' : 'opacity-0 invisible'}`}
                  >
                    <FormError message={errors.email || ''} />
                  </div>
                </div>
              </div>

              {/* Campo Palavra-passe com container de erro estático */}
              <div className='flex flex-col'>
                <PasswordInput
                  value={password}
                  onChange={setPassword}
                  showPassword={showPassword}
                  onToggleShow={() => setShowPassword(!showPassword)}
                />
                <div className='h-5 flex items-center pl-1 mt-1.5'>
                  <div
                    className={`text-xs transition-opacity duration-150 ${errors.password ? 'opacity-100' : 'opacity-0 invisible'}`}
                  >
                    <FormError message={errors.password || ''} />
                  </div>
                </div>
              </div>

              {/* Recuperação de Senha */}
              <div className='flex justify-end pb-2'>
                <Link
                  to='/forgot'
                  className='text-xs text-(--color-sky-blue-600) font-medium hover:text-(--color-sky-blue-700) hover:underline transition-colors'
                >
                  Esqueceu-se da palavra-passe?
                </Link>
              </div>

              {/* Botão de Submissão */}
              <button
                type='submit'
                disabled={isLoading}
                className='w-full py-3.5 rounded-2xl text-white font-semibold text-base bg-(--color-mint-leaf-500) hover:bg-(--color-mint-leaf-600) transition-all duration-300 active:scale-[0.99] shadow-md hover:shadow-lg disabled:opacity-70 disabled:pointer-events-none cursor-pointer flex items-center justify-center'
              >
                {isLoading ? (
                  <div className='flex items-center justify-center gap-2'>
                    <Ring2
                      size='16'
                      stroke='3'
                      strokeLength='0.20'
                      bgOpacity='0.1'
                      speed='0.4'
                      color='white'
                    />
                    <span>A iniciar sessão...</span>
                  </div>
                ) : (
                  <span>Iniciar sessão</span>
                )}
              </button>
            </form>

            {/* Rodapé */}
            <p className='text-center text-[10px] text-gray-400 pt-3 border-t border-gray-100'>
              © {new Date().getFullYear()} Xitique. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
