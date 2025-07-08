import type { Metadata } from 'next';
import { Eagle_Lake } from 'next/font/google';
import { AppProvider } from '@/app/AppContext';
import './globals.css';

const eagleLake = Eagle_Lake({
	variable: '--font-eagle-lake',
	subsets: ['latin'],
	weight: '400',
});

export const metadata: Metadata = {
	title: 'Tarokka',
	description: 'Fortune telling for D&D’s Curse of Strahd',
	metadataBase: new URL('https://tarokka.app'),
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
		<html lang="en" className={`${eagleLake.variable} antialiased overscroll-none`}>
			<body className={`${eagleLake.className} antialiased h-dvh`}>
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	);
}
