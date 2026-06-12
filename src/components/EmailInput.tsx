import { User } from 'lucide-react';

interface EmailInputProps {
	value: string;
	onChange: (value: string) => void;
	delay?: number;
}

export function EmailInput({ value, onChange, delay = 0.1 }: EmailInputProps) {
	return (
		<div className='space-y-1.5'>
			<label htmlFor='email' className='block text-sm font-medium text-gray-700'>
				Email ou Nome de Utilizador
			</label>
			<div className='relative'>
				<User className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
				<input
					id='email'
					type='text'
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className='w-full pl-11 pr-5 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-(--color-mint-leaf-500) transition-all'
					placeholder='exemplo@email.com'
				/>
			</div>
		</div>
	);
}
