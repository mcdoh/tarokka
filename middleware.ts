import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const url = request.nextUrl;
	const slug = url.pathname.slice(1);

	const blocked = [
		'apple-icon.png',
		'favicon.ico',
		'icon0.svg',
		'icon1.png',
		'manifest.json',
		'opengraph-image.png',
		'twitter-image.png',
		'web-app-manifest-192x192.png',
		'web-app-manifest-512x512.png',
	];

	if (blocked.includes(slug)) {
		return NextResponse.rewrite(request.url);
	}

	return NextResponse.next();
}
