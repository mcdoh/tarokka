'use client';

import { useState } from 'react';
import { Copy as CopyIcon, Check as CheckIcon } from 'lucide-react';

import ToolTip from '@/components/ToolTip';

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
		<ToolTip content={copy}>
			<button
				onClick={handleCopy}
				className="w-full py-1 px-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex flex-col items-start gap-1 shadow transition-all cursor-pointer"
			>
				<div className="flex items-center gap-2 w-full text-sm font-medium">
					{`Copy ${title}`}
					{copied ? (
						<CheckIcon className="ml-auto" size={16} />
					) : (
						<CopyIcon className="ml-auto" size={16} />
					)}
				</div>
			</button>
		</ToolTip>
	);
}
