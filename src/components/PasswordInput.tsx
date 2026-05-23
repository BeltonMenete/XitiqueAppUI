import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { ANIMATION_DURATION } from '#/lib/constants';

interface PasswordInputProps {
	value: string;
	onChange: (value: string) => void;
	showPassword: boolean;
	onToggleShow: () => void;
	delay?: number;
}

export function PasswordInput({ value, onChange, showPassword, onToggleShow, delay = 0.12 }: PasswordInputProps) {
	return (
		<motion.div
			layout
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: ANIMATION_DURATION.NORMAL, delay }}
			className='space-y-1.5'
		>
			<label htmlFor='password' className='block text-sm font-medium text-gray-700'>
				Palavra-passe
			</label>
			<motion.div
				whileFocus={{ scale: 1.005 }}
				transition={{ duration: ANIMATION_DURATION.FAST }}
				className='relative'
			>
				<Lock className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
				<input
					id='password'
					type={showPassword ? 'text' : 'password'}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className='w-full pl-11 pr-12 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-(--color-mint-leaf-500) transition-all'
					placeholder='••••••••'
				/>
				<motion.button
					type='button'
					whileTap={{ scale: 0.95 }}
					transition={{ duration: ANIMATION_DURATION.FAST }}
					onClick={onToggleShow}
					className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer'
				>
					<AnimatePresence mode='wait'>
						<motion.div
							key={showPassword ? 'off' : 'on'}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: ANIMATION_DURATION.FAST }}
						>
							{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
						</motion.div>
					</AnimatePresence>
				</motion.button>
			</motion.div>
		</motion.div>
	);
}
