import { Button } from "#/components/ui/Button";
import { cn } from "#/lib/design-system";
import { useState } from "react";

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	variant?: "primary" | "secondary" | "outline";
	size?: "sm" | "md" | "lg";
}

export function RippleButton({
	children,
	variant = "primary",
	size = "md",
	className,
	onClick,
	...props
}: RippleButtonProps) {
	const [ripples, setRipples] = useState<
		{ x: number; y: number; id: number }[]
	>([]);

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const button = e.currentTarget;
		const rect = button.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const newRipple = { x, y, id: Date.now() };
		setRipples([...ripples, newRipple]);

		setTimeout(() => {
			setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
		}, 600);

		onClick?.(e);
	};

	return (
		<Button
			{...props}
			variant={variant}
			size={size}
			className={cn("relative overflow-hidden", className)}
			onClick={handleClick}
		>
			{ripples.map((ripple) => (
				<span
					key={ripple.id}
					className="absolute animate-ripple rounded-full bg-white/30 pointer-events-none"
					style={{
						left: ripple.x,
						top: ripple.y,
						width: "100px",
						height: "100px",
						marginLeft: "-50px",
						marginTop: "-50px",
					}}
				/>
			))}
			<span className="relative z-10">{children}</span>
		</Button>
	);
}
