import Link from 'next/link';

export default function Custom404() {
	return (
		<main className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-[url('/img/table3.png')] bg-cover bg-center">
			<h1 className="text-4xl font-bold text-gray-400 mb-4">404 - Game Not Found</h1>
			<p className="text-lg text-gray-400">
				The game you’re looking for doesn’t exist or has expired.
			</p>
			<Link href="/">
				<button className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition cursor-pointer">
					Return Home
				</button>
			</Link>
		</main>
	);
}
