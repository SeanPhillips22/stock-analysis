declare global {
	// eslint-disable-next-line no-unused-vars
	interface Window {
		clarity: any
		dataLayer: any
	}
}

/**
 * Track user events in Google Analytics and Microsoft Clarity
 * @param action Usually "Click"
 * @param category Like "Button", "CTA", "Link", "Play"
 * @param label Easy to understand label
 * @param value
 */
export function event(
	action: string,
	category: string,
	label: string,
	value?: string
) {
	if (typeof window !== 'undefined') {
		if (window.dataLayer) {
			window.dataLayer.push({
				event: action,
				category,
				label,
				value
			})
		}
		if (window.clarity) {
			window.clarity('set', action, label)
		}
	}
}
