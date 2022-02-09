/**
 * Stringify a JSON object, but use a consistent order so that
 * it can be used to compare two objects
 * @param obj an object
 */
export function objString(obj: any) {
	// Sort the object by keys and then return it as a string
	return JSON.stringify(
		Object.keys(obj)
			.sort()
			.reduce((acc: any, key) => {
				acc[key] = obj[key]
				return acc
			}, {})
	)
}
