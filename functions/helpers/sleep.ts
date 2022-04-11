/**
 * Add a delay, in milliseconds. Do "await sleep(2000)" to wait 2 seconds.
 */
export function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms))
}
