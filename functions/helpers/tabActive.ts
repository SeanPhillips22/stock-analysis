/**
 * Checks if both params are equal, then returns either 'active' or 'inactive'
 * @param current string or number
 * @param tabName string or number
 * @returns
 */
export function tabActive(current: string | number, tabName: string | number, lvl?: number): 'active' | 'inactive' {
	// If the tab is a parent of a submenu, then match its level in the hierary
	// in order to determine if it is active or not
	// For example, if /markets/premarket/ has children, then it should always be active
	// if the active page is a child of this page
	if (lvl && typeof current === 'string') {
		let newstr = ''
		let split = current.split('/')

		for (let i = 0; i < lvl + 1; i++) {
			newstr += split[i] + '/'
		}
		current = newstr
	}

	return current === tabName ? 'active' : 'inactive'
}
