export function throttle(func: Function, threshold: number) {
	let lastCall = 0;

	return (...args: any[]) => {
		const now = Date.now();

		if (now - lastCall >= threshold) {
			lastCall = now;
			func(...args);
		}
	};
}
