import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { APP_NAME, ANIMATION_DURATION } from '#/lib/constants';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
      <div className='text-center space-y-8'>
        <div>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-2'>OLÁ, SEJA BEM-VINDO AO {APP_NAME}</h1>
          <p className='text-lg text-gray-600'>Plataforma de Gestão de poupanças e organização Financeira</p>
        </div>

        <div>
          <Link
            to='/login'
            className='inline-block px-8 py-3 bg-(--color-mint-leaf-500) hover:bg-(--color-mint-leaf-600) text-white font-semibold rounded-2xl shadow-lg transition-colors'
          >
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
}
