function checkIfDateIsEqualOrSetLater(yearAgo: Date, oldestDate: Date) {
	return (
		(oldestDate.getMonth() != yearAgo.getMonth() ||
			oldestDate.getFullYear() != yearAgo.getFullYear()) &&
		oldestDate > yearAgo
	)
}

export function fillWhitespaceLine(chart: any) {
	let whiteSpaceMonths = []
	// If there is a full chart, then this should match the oldest date on the chart
	// The date one year ago
	let yearAgo = new Date(chart[chart.length - 2].t)
	yearAgo.setDate(1)
	yearAgo.setFullYear(yearAgo.getFullYear() - 1)

	// The oldest date on the chart
	let oldestDate = new Date(chart[0].t)
	oldestDate.setDate(1)

	//For loop checks whether the date of the oldest price is older than a year from the first price point and whether it's in the same month and iterates month by month.
	if (checkIfDateIsEqualOrSetLater(yearAgo, oldestDate)) {
		for (let i = 0; i < 12; i++) {
			// This case handles specifically if month is set to January and year needs to be changed
			if (
				yearAgo.getFullYear() != oldestDate.getFullYear() &&
				oldestDate.getMonth() == 0
			) {
				oldestDate.setMonth(11)
				oldestDate.setFullYear(oldestDate.getFullYear() - 1)
				//Month is set to the one before it.
			} else {
				oldestDate.setMonth(oldestDate.getMonth() - 1)
			}
			let dateObj = {
				x:
					oldestDate.getFullYear().toString() +
					'-' +
					(oldestDate.getMonth() + 1).toString() +
					'-' +
					oldestDate.getDate(),
				y: chart[0].c
			}

			whiteSpaceMonths.push(dateObj)
		}
	}

	return whiteSpaceMonths
}
