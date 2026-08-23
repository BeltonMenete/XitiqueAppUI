import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "#/lib/design-system"

const buttonVariants = cva(
	"inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default: "bg-emerald-500 text-white hover:bg-emerald-600",
				destructive:
					"bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500/20",
				outline:
					"border border-slate-300 bg-white hover:bg-slate-50 text-slate-700",
				secondary:
					"bg-slate-100 text-slate-700 hover:bg-slate-200",
				ghost:
					"hover:bg-slate-100 text-slate-600",
				link: "text-emerald-500 underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
				icon: "size-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
	VariantProps<typeof buttonVariants> {
	isLoading?: boolean;
	loadingText?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, isLoading, loadingText = "Carregando...", leftIcon, rightIcon, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button"

		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				disabled={isLoading || props.disabled}
				{...props}
			>
				{isLoading ? (
					<>
						<svg
							className="animate-spin -ml-1 mr-2 h-4 w-4"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<title>Carregando</title>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							/>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
						{loadingText}
					</>
				) : (
					<>
						{leftIcon && <span className="mr-2">{leftIcon}</span>}
						{props.children}
						{rightIcon && <span className="ml-2">{rightIcon}</span>}
					</>
				)}
			</Comp>
		)
	}
)
Button.displayName = "Button"

export { Button, buttonVariants }
