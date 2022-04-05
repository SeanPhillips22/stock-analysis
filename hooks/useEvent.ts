import { isDev } from 'components/Ads/noAds'
import { usePlausible } from 'next-plausible'

declare global {
	// eslint-disable-next-line no-unused-vars
	interface Window {
		clarity: any
	}
}

/**
 * A custom hook that returns an event tracking function
 */
export function useEvent() {
	const plausible = usePlausible()

	function event(eventName: string, eventValue?: string, eventProps?: any) {
		// If in development mode, console.og the event
		if (isDev()) {
			console.log(`Tracking event ${eventName}`, eventProps)
		}

		// Track via plausible analytics
		plausible(eventName, eventProps)

		// Track via Microsoft Clarity
		if (window.clarity) {
			window.clarity('set', eventName, eventValue || eventName)
		}
	}

	return { event }
}
