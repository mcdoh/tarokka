/**
 * A logging utility designed to be inserted into functional chains.
 * Logs all parameters with an optional prefix, then returns the first argument unchanged.
 *
 * @param {string} [prefix=''] - A label or message to prepend to the logged output.
 * @returns {(value: any, ...rest: any[]) => any} - A function that logs its arguments and returns the first one.
 *
 * @example
 * const result = [1, 2, 3]
 *   .map((n) => n * 2)
 *   .map(log('doubled:'))
 *   .filter((n) => n > 2);
 */
export const log =
	(prefix: string = ''): ((value: any, ...rest: any[]) => any) =>
	(...args: any[]) => {
		console.log(prefix, ...args);
		return args[0];
	};
