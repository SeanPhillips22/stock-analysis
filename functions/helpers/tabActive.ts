/**
 * Checks if both params are equal, then returns either 'active' or 'inactive'
 * @param current string or number
 * @param tabName string or number
 * @returns
 */
export function tabActive(
	current: string | number,
	tabName: string | number
): 'active' | 'inactive' {
	return current === tabName ? 'active' : 'inactive'
}
