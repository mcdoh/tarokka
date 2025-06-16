import { useRef } from 'react';

export default function TiltCard({
	children,
	className = '',
	onClick = () => {},
}: {
	children: React.ReactNode;
	className?: string;
	onClick: (event: React.MouseEvent) => void;
}) {
	const cardRef = useRef<HTMLDivElement>(null);

	const handleMouseMove = (e: React.MouseEvent) => {
		const card = cardRef.current;
		if (!card) return;

		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const rotateX = ((y - centerY) / centerY) * -20;
		const rotateY = ((x - centerX) / centerX) * 20;

		card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
	};

	const handleMouseLeave = () => {
		const card = cardRef.current;
		if (!card) return;
		card.style.transform = `rotateX(0deg) rotateY(0deg)`;
	};

	return (
		<div
			className={`${className}`}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			onClick={onClick}
		>
			<div ref={cardRef} className={`h-full w-full transition-transform duration-0`}>
				{children}
			</div>
		</div>
	);
}
