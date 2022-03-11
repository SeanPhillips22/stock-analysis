declare global {
	// eslint-disable-next-line no-unused-vars
	interface Window {
		clarity: any
	}
}

export function event(action: string, label: string) {
	if (typeof window !== 'undefined') {
		if (window.clarity) {
			window.clarity('set', action, label)
		}
	}
}
