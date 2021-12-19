import { RefObject, useEffect } from 'react'

/**
 * useClickOutside -- A custom hook that detects when a user clicks outside of something
 * @param ref a reference to the element that responds to clicks *outside of it*
 * @param callback the function to execute when clicked outside
 */
export function useClickOutside(
	ref: RefObject<HTMLDivElement> | null,
	callback: () => void
) {
	useEffect(() => {
		const handler = (event: MouseEvent) => {
			if (!ref || !ref.current) return null

			// If the event target is not inside the ref element
			// that means that the click was "outside" so the
			// function should execute
			if (!ref.current.contains(event.target as Node)) {
				return callback()
			}
		}

		document.addEventListener('mousedown', handler)

		return () => {
			document.removeEventListener('mousedown', handler)
		}
	}, [ref, callback])
}
