import { PathObject } from 'state/navState'

/**
 * This function checks whether the current path matches a particular nav item
 * @param path the object that contains the current navigation path
 * @param checkHref the url to check against the current path
 * @returns
 */
export function matchPath(path: PathObject, checkHref: string) {
	if (checkHref === '/' && !path.one) return true // Match home

	// Match full path
	let currentUrl = '/' + path.one + (path.two ? '/' + path.two + '/' : '/')
	if (currentUrl === checkHref) return true
	if (currentUrl.toLowerCase() === checkHref.toLowerCase()) return true

	// No match
	return false
}

export function matchParentPath(path: PathObject, checkHref: string) {
	let parentHref = checkHref.split('/')[1]

	// Match full path
	if (path.one === parentHref) return true
	if (path.one?.toLowerCase() === parentHref.toLowerCase()) return true

	// No match
	return false
}
