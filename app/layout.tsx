import type { Metadata } from 'next';
import { Pirata_One, Eagle_Lake, Cinzel_Decorative } from 'next/font/google';
import './globals.css';

const pirataOne = Pirata_One({
	variable: '--font-pirata',
	subsets: ['latin'],
	weight: '400',
});

const eagleLake = Eagle_Lake({
	variable: '--font-eagle-lake',
	subsets: ['latin'],
	weight: '400',
});

const cinzel = Cinzel_Decorative({
	variable: '--font-cinzel',
	subsets: ['latin'],
	weight: '400',
});

export const metadata: Metadata = {
	title: 'Tarokka',
	description: 'Fortune telling for D&D’s Curse of Strahd',
	appleWebApp: {
		title: 'Tarokka',
		statusBarStyle: 'black-translucent',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${pirataOne.variable} ${eagleLake.variable} ${cinzel.variable} antialiased`}
		>
			<body className={`${eagleLake.className} antialiased`}>{children}</body>
		</html>
	);
}
