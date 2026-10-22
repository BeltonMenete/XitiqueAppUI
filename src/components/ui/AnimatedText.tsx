import { useEffect, useState } from "react";
import { cn } from "#/lib/design-system";

interface AnimatedTextProps {
	text: string;
	className?: string;
	animation?: "fade" | "slide" | "highlight";
}

export function AnimatedText({
	text,
	className,
	animation = "fade",
}: AnimatedTextProps) {
	const [displayText, _setDisplayText] = useState(text);
	const [animating, setAnimating] = useState(false);

	useEffect(() => {
		if (displayText === text) return;

		setAnimating(true);

		const timeout = setTimeout(() => {
			_setDisplayText(text);
			setTimeout(() => setAnimating(false), 300);
		}, 150);

		return () => clearTimeout(timeout);
	}, [text, displayText]);

	const animationClass = {
		fade: animating ? "animate-smooth-fade" : "",
		slide: animating ? "animate-smooth-slide" : "",
		highlight: animating ? "animate-highlight-fade" : "",
	};

	return (
		<span className={cn(animationClass[animation], className)}>
			{displayText}
		</span>
	);
}
