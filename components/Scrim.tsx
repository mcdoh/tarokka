'use client';

type ScrimProps = {
	children: React.ReactNode;
	clickAction: (event: React.MouseEvent<HTMLDivElement>) => void;
	show?: boolean;
	className?: string;
};

export default function Scrim({ children, clickAction, show = true, className = '' }: ScrimProps) {
	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			clickAction(event);
		}
	};
	if (!show) return null;

	return (
		<div
			onClick={handleClick}
			className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 ${className}`}
		>
			{children}
		</div>
	);
}
