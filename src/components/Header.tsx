import { UserPlus } from 'lucide-react';
import { APP_NAME } from '#/lib/constants';

export function Header() {
	return (
		<div className='flex justify-between items-center'>
			<div className='flex items-center gap-2.5'>
				<img src='/xitique-logo.svg' alt={APP_NAME} className='w-10 h-10' />
				<h1 className='text-3xl font-semibold text-gray-900'>{APP_NAME}</h1>
			</div>

			<a
				href='#'
				className='flex items-center gap-1.5 text-sm font-medium text-[var(--color-sky-blue-600)]'
			>
				<UserPlus size={18} />
				Criar conta
			</a>
		</div>
	);
}
