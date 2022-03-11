declare global {
	// eslint-disable-next-line no-unused-vars
	interface Window {
		gtag: any
	}
}

export function event(
	action: string,
	category: string,
	label: string,
	value?: string | number
) {
	console.log('Sending the event: ' + action)
	if (typeof window !== 'undefined') {
		if (window.gtag) {
			window.gtag('event', action, {
				event_category: category,
				event_label: label,
				value: value
			})
		}
	}
}
