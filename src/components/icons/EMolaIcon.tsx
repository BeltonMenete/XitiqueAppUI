import type { ImgHTMLAttributes } from 'react';

export function EMolaIcon({ className, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src='/emola.svg'
            alt='e-Mola'
            className={`aspect-square object-cover rounded-md bg-[#f37227] p-1.5 ${className}`}
            {...props}
        />
    );
}
