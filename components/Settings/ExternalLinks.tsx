'use client';

import BuyMeACoffee from '@/components/BuyMeACoffee';
import GitHubButton from '@/components/GitHubButton';

export default function CardStyle({ className }: { className?: string }) {
	return (
		<span className={`w-full flex flex-row justify-between ${className}`}>
			<GitHubButton className="h-[35px] w-[125px]" />
			<BuyMeACoffee className="h-[35px] w-[125px]" />
		</span>
	);
}
