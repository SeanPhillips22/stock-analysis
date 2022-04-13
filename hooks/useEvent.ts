import { isDev } from 'components/Ads/noAds'
import { usePlausible } from 'next-plausible'

declare global {
	// eslint-disable-next-line no-unused-vars
	interface Window {
		clarity: any
	}
}

type EventProps = {
	type?: string
	details?: string
	location?: string // where in the layout the event is
	title?: string
	step?: string // if it's a multi-step process
	statusCode?: string | number
	isPro?: boolean
	isLoggedIn?: boolean
	query?: string
}

/**
 * A custom hook that returns an event tracking function
 */
export function useEvent() {
	const plausible = usePlausible()

	function event(eventName: string, eventProps?: EventProps) {
		// If in development mode, console.log the event
		if (isDev()) {
			console.log(`Tracking event ${eventName}`, eventProps)
			return
		}

		// Track via plausible analytics
		if (eventProps) {
			plausible(eventName, { props: eventProps })
		} else {
			plausible(eventName)
		}

		// Track via Microsoft Clarity
		if (window.clarity) {
			window.clarity('set', eventName, eventProps?.type || eventProps?.location || eventName)
		}
	}

	return { event }
}
