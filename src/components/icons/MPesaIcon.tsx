import type { ImgHTMLAttributes } from "react";

export function MPesaIcon({
	className,
	...props
}: ImgHTMLAttributes<HTMLImageElement>) {
	return (
		<img
			src="/mpesa.svg"
			alt="M-Pesa"
			className={`aspect-square object-cover rounded-md bg-[#e50000] p-1.5 ${className}`}
			{...props}
		/>
	);
}
