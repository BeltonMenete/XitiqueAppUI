import { useEffect, useRef, useState } from "react";
import { cn } from "#/lib/design-system";

interface AnimatedNumberProps {
	value: number;
	duration?: number;
	className?: string;
	format?: boolean;
}

export function AnimatedNumber({
	value,
	duration = 500,
	className,
	format = true,
}: AnimatedNumberProps) {
	const [displayValue, setDisplayValue] = useState(value);
	const prevValueRef = useRef(value);
	const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);

	useEffect(() => {
		const prevValue = prevValueRef.current;
		if (prevValue === value) return;

		// Cancel any ongoing animation
		if (animationRef.current !== null) {
			cancelAnimationFrame(animationRef.current);
		}

		const startTime = performance.now();
		const startValue = prevValue;
		const endValue = value;
		const difference = endValue - startValue;

		const animate = (currentTime: number) => {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);

			// Easing function (ease-out cubic)
			const easedProgress = 1 - (1 - progress) ** 3;

			const currentValue = startValue + difference * easedProgress;
			setDisplayValue(currentValue);

			if (progress < 1) {
				animationRef.current = requestAnimationFrame(animate);
			} else {
				setDisplayValue(endValue);
				prevValueRef.current = endValue;
				animationRef.current = null;
			}
		};

		animationRef.current = requestAnimationFrame(animate);

		return () => {
			if (animationRef.current !== null) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [value, duration]);

	return (
		<span
			className={cn("inline-block transition-all duration-200 ease-out", className)}
		>
			{format ? displayValue.toLocaleString() : displayValue}
		</span>
	);
}
