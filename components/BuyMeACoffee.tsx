'use client';

type BuyMeACoffeeProps = {
	className?: string;
};

export default function BuyMeACoffee({ className = '' }: BuyMeACoffeeProps) {
	return (
		<a
			href="https://www.buymeacoffee.com/mcdoh"
			className={`transition hover:drop-shadow-[0_0_3px_#ffd700] ${className}`}
			target="_blank"
		>
			<img src="/img/bmc-button.svg" alt="Buy Me A Coffee" className="h-full" />
		</a>
	);
}
