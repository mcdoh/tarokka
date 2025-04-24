'use client';

import { useState } from 'react';
import { Copy as CopyIcon, Check as CheckIcon } from 'lucide-react';

import ToolTip from '@/components/ToolTip';

type CopyButtonProps = {
	title?: string;
	copy: string;
	tooltip?: string | string[];
	className?: string;
};

export default function CopyButton({
	title,
	copy,
	tooltip = ['Copy', 'Copied'],
	className,
}: CopyButtonProps) {
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

	const ttContent = (
		<span className="text-yellow-300">
			{Array.isArray(tooltip) && tooltip.length > 1 ? (copied ? tooltip[1] : tooltip[0]) : tooltip}
		</span>
	);

	return (
		<button onClick={handleCopy} className={`cursor-pointer ${className}`}>
			<ToolTip content={ttContent} className="w-full font-yellow-400">
				<div className="flex items-center gap-2 w-full text-sm font-medium">
					{title}
					{copied ? (
						<CheckIcon className="ml-auto" size={16} />
					) : (
						<CopyIcon className="ml-auto" size={16} />
					)}
				</div>
			</ToolTip>
		</button>
	);
}
