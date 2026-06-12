interface FormErrorProps {
	message: string;
}

export function FormError({ message }: FormErrorProps) {
	return (
		<div className='overflow-hidden'>
			<p className='text-xs text-red-600 font-medium'>{message}</p>
		</div>
	);
}
