export const formatDateTimestamp = (string: string) => {
	const datetime = new Date(string)
	const timestamp = datetime.toLocaleString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	})
	return timestamp
}

export const formatDateClean = (string: string) => {
	const datetime = new Date(string)
	const date = datetime.toLocaleString('en-US', {
		day: 'numeric',
		year: 'numeric',
		month: 'short'
	})
	return date
}

// Input: Feb 9, 2022 10:48
// Output: 10:48 AM
export const formatDateMinute = (string: string) => {
	const dt = new Date(string)
	let hour = dt.getHours()
	let minute: string | number = dt.getMinutes()

	// Add zero in front of minutes < 10
	if (minute < 10) minute = '0' + minute

	// Decide whether to append AM (9-11AM) or PM (12-4PM)
	if (hour < 12) return `${hour}:${minute} AM`
	if (hour === 12) return `${hour}:${minute} PM`
	if (hour > 12) return `${hour - 12}:${minute} PM`
	return ''
}

export const formatDateHour = (string: string) => {
	const datetime = new Date(string)
	const date = datetime.toLocaleString('en-US', {
		month: 'short',
		day: 'numeric',
		hour: '2-digit'
	})
	return date
}

export const formatDateDay = (string: string) => {
	const datetime = new Date(string)
	const date = datetime.toLocaleString('en-US', {
		timeZone: 'America/New_York',
		month: 'short',
		day: 'numeric'
	})
	return date
}

export const formatDateMonth = (string: string) => {
	const datetime = new Date(string)
	const date = datetime.toLocaleString('en-US', {
		timeZone: 'America/New_York',
		year: 'numeric',
		month: 'short'
	})
	return date
}

export const formatDateYear = (string: string) => {
	const datetime = new Date(string)
	const date = datetime.toLocaleString('en-US', {
		timeZone: 'America/New_York',
		year: 'numeric'
	})
	const dateNum = parseInt(date)
	return dateNum
}

export const formatDateUSA = (string: string) => {
	const datetime = new Date(string)
	const date = datetime.toLocaleDateString('en-US')
	return date
}
