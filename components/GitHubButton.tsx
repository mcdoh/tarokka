'use client';

type GitHubButtonProps = {
	className?: string;
};

export default function GitHubButton({ className = '' }: GitHubButtonProps) {
	return (
		<a
			href="https://github.com/mcdoh/tarokka"
			className={className}
			target="_blank"
			rel="noopener noreferrer"
		>
			<button className="h-full w-full flex flex-row justify-center items-center gap-3 bg-slate-700 rounded-[6px] hover:bg-slate-600 transition cursor-pointer">
				<img src="/img/github-mark-white.svg" alt="GitHub" className="h-[22px] w-[22px]" />
				<img src="/img/github-logo-white.png" alt="GitHub" className="h-[22px]" />
			</button>
		</a>
	);
}
