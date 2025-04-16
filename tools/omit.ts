export default function omit<T extends Record<string, any>>(
	obj: T,
	propToRemove: keyof T,
): Omit<T, typeof propToRemove> {
	const { [propToRemove]: _, ...rest } = obj;
	return rest;
}
