import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EmailInput } from '#/components/EmailInput';
import { PasswordInput } from '#/components/PasswordInput';
import { FormError } from '#/components/FormError';
import { validateLoginForm } from '#/lib/validation';
import { LOGIN_SUBMIT_DELAY, ANIMATION_DURATION, APP_NAME } from '#/lib/constants';
import { Ring2 } from 'ldrs/react';
import { UserPlus } from 'lucide-react';

export const Route = createFileRoute('/_auth/login')({
   component: Login,
});

// Default values shown

function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [errors, setErrors] = useState<Record<string, string>>({});

   const handleSubmit = async (e: React.FormEvent) => {
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

                     <motion.a
                        href='#'
                        whileHover={{ x: 1 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ duration: ANIMATION_DURATION.FAST }}
                        className='flex items-center gap-1.5 text-sm font-medium text-(--color-sky-blue-600)'
                     >
                        <UserPlus size={18} />
                        <Link to='/signup'>Criar conta</Link>
                     </motion.a>
                  </motion.div>

                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: ANIMATION_DURATION.NORMAL, delay: 0.08 }}
                  >
                     <h1 className='text-3xl font-semibold text-gray-900 mb-1'>Iniciar sessão</h1>
                     <p className='text-gray-600 text-center'>Aceda à sua conta</p>
                  </motion.div>

                  <form onSubmit={handleSubmit} noValidate className='space-y-4'>
                     <motion.div layout className='space-y-2'>
                        <EmailInput value={email} onChange={setEmail} />
                        <AnimatePresence mode='wait'>
                           {errors.email && <FormError message={errors.email} />}
                        </AnimatePresence>
                     </motion.div>

                     <motion.div layout className='space-y-2'>
                        <PasswordInput
                           value={password}
                           onChange={setPassword}
                           showPassword={showPassword}
                           onToggleShow={() => setShowPassword(!showPassword)}
                        />
                        <AnimatePresence mode='wait'>
                           {errors.password && <FormError message={errors.password} />}
                        </AnimatePresence>
                     </motion.div>
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: ANIMATION_DURATION.NORMAL, delay: 0.14 }}
                        className='flex justify-end'
                     >
                        <motion.a
                           href='#'
                           whileHover={{ x: 1 }}
                           transition={{ duration: ANIMATION_DURATION.FAST }}
                           className='text-sm text-(--color-sky-blue-600) font-medium'
                        >
                           <Link to='/forgot-password'>Esqueceu-se da palavra-passe?</Link>
                        </motion.a>
                     </motion.div>

                     <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: ANIMATION_DURATION.FAST, delay: 0.16 }}
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
                                 A iniciar sessão...
                              </motion.div>
                           ) : (
                              <motion.span
                                 key='text'
                                 initial={{ opacity: 0 }}
                                 animate={{ opacity: 1 }}
                                 exit={{ opacity: 0 }}
                                 transition={{ duration: ANIMATION_DURATION.FAST }}
                              >
                                 Iniciar sessão
                              </motion.span>
                           )}
                        </AnimatePresence>
                     </motion.button>
                  </form>

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
