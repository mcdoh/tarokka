'use client';

type BuyMeACoffeeProps = {
	className?: string;
};

export default function BuyMeACoffee({ className = '' }: BuyMeACoffeeProps) {
	return (
		<a href="https://www.buymeacoffee.com/mcdoh" className={className} target="_blank">
			<img src="/img/bmc-button.svg" alt="Buy Me A Coffee" className="h-full" />
		</a>
	);
}
