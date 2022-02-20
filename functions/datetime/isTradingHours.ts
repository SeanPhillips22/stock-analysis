// Check if the current time is during trading hours (weekdays between 4:00 and 20:00)
export function isTradingHours() {
	const now = new Date().toLocaleString('en-US', {
		timeZone: 'America/New_York'
	})

	const US = new Date(now)

	const day = US.getDay()
	const hour = US.getHours()

	if (day === 0 || day === 6) {
		return false
	}

	if (hour < 4 || hour > 20) {
		return false
	}

	return true
}

export function isTradingHoursOpen() {
	const now = new Date().toLocaleString('en-US', {
		timeZone: 'America/New_York'
	})

	const US = new Date(now)

	const day = US.getDay()
	const hour = US.getHours()
	const minutes = US.getMinutes()

	if (day === 0 || day === 6) {
		return false
	}

	if (hour < 9 || (hour === 9 && minutes < 30) || hour > 15) {
		return false
	}

	return true
}

export function isTradingHoursClosed() {
	const now = new Date().toLocaleString('en-US', {
		timeZone: 'America/New_York'
	})

	const US = new Date(now)

	const day = US.getDay()
	const hour = US.getHours()

	if (day === 0 || day === 6) {
		return true
	}

	if (hour < 4 || hour > 19) {
		return true
	}

	return false
}

export function isExtendedHours() {
	const now = new Date().toLocaleString('en-US', {
		timeZone: 'America/New_York'
	})

	const US = new Date(now)

	const day = US.getDay()
	const hour = US.getHours()
	const minutes = US.getMinutes()

	if (day === 0 || day === 6) {
		return false
	}

	// If 4:00-9:30 or 16:00-20:00 return true
	// Else, return false
	if (hour > 3 && hour < 20) {
		if (hour > 9 && hour < 16) {
			// Between 9:00 and 9:30, return true
			if (hour === 9 && minutes < 30) return true
			// Between 9:30 and 16:00, return false
			else return false
		}
		return true
	}

	return false
}
// Exporting this prevents the function from having to be called
// every time the value is used
export const isExtended = isExtendedHours()
