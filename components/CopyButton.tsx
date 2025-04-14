'use client';

import { useState } from 'react';
import { Copy as CopyIcon } from 'lucide-react';

type CopyButtonProps = {
	title: string;
	copy: string;
};

export default function CopyButton({ title, copy }: CopyButtonProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(copy);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy!', err);
		}
	};

	return (
		<button
			onClick={handleCopy}
			className="px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl flex flex-col items-start gap-1 shadow transition-all cursor-pointer"
		>
			<div className="flex items-center gap-2 w-full text-sm font-medium">
				{`${copied ? 'Copied' : 'Copy'} ${title}`}
				<CopyIcon className="ml-auto" size={16} />
			</div>
			<div className="text-xs font-mono opacity-80 break-all">{copy}</div>
		</button>
	);
}
