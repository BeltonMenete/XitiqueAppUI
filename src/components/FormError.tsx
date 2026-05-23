import { motion } from 'framer-motion';

interface FormErrorProps {
	message: string;
}

export function FormError({ message }: FormErrorProps) {
	return (
		<motion.div
			layout
			initial={{ opacity: 0, height: 0 }}
			animate={{ opacity: 1, height: 'auto' }}
			exit={{ opacity: 0, height: 0 }}
			transition={{ duration: 0.2 }}
			className='overflow-hidden'
		>
			<p className='text-xs text-red-600 font-medium'>{message}</p>
		</motion.div>
	);
}
