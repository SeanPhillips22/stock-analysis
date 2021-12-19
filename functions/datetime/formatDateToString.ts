/**
 * Formats a date object to YYYY-MM-DD
 * @date {Date} (optional) The date object to format
 */
export function formatDateToString(date?: Date): string {
	const dt = date ?? new Date()

	let dateString = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000)
		.toISOString()
		.split('T')[0]

	return dateString
}
