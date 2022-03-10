import { useEffect, useState } from 'react'

/**
 * Can be used to decide whether or not to load an Adsense ad based on the screen size
 * @param {string} query should be in the format: (min-width: 1024px) -- this hides the ad on screens 1024px and larger
 * @returns {boolean} true or false
 */
function useMediaQuery(query: string): boolean {
	const getMatches = (query: string): boolean => {
		// Prevents SSR issues
		if (
			typeof window !== 'undefined' &&
			// @ts-ignore
			typeof window?.matchMedia?.addEventListener === 'function'
		) {
			return window.matchMedia(query).matches
		}
		return false
	}

	const [matches, setMatches] = useState<boolean>(getMatches(query))

	function handleChange() {
		setMatches(getMatches(query))
	}

	useEffect(() => {
		// @ts-ignore
		if (typeof window?.matchMedia?.addEventListener !== 'function') return
		const matchMedia = window.matchMedia(query)

		// Triggered at the first client-side load and if query changes
		handleChange()

		// Listen matchMedia
		matchMedia.addEventListener('change', handleChange)

		return () => {
			matchMedia.removeEventListener('change', handleChange)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query])

	return matches
}

export default useMediaQuery
