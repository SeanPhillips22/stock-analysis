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
	let yearAgo = new Date(chart[chart.length - 2]?.t)
	yearAgo.setDate(1)
	yearAgo.setFullYear(yearAgo.getFullYear() - 1)

	// The oldest date on the chart
	let oldestDate = new Date(chart[0]?.t)
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

			if (oldestDate < yearAgo) break

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

const dec0 = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
})

export function formatTarget(num: number) {
	return num > 1000 ? dec0.format(num) : num
}

export interface priceRects {
	highTop: number
	highBottom: number
	avgTop: number
	avgBottom: number
	lowTop: number
	lowBottom: number
}

export function collisionOffset(coords: priceRects) {
	let avoidCollisionOffsetHighAvg
	let avoidCollisonOffsetAvgLow
	let shiftLabelsUp = coords.lowBottom > 200
	if (shiftLabelsUp) {
		avoidCollisonOffsetAvgLow = compareTwoLabels(
			coords.lowTop,
			coords.lowBottom,
			coords.avgTop,
			coords.avgBottom,
			true
		)

		avoidCollisionOffsetHighAvg = compareTwoLabels(
			coords.avgTop + avoidCollisonOffsetAvgLow * -1,
			coords.avgBottom + avoidCollisonOffsetAvgLow * -1,
			coords.highTop,
			coords.highBottom,
			true
		)
	} else {
		avoidCollisionOffsetHighAvg = compareTwoLabels(
			coords.highTop,
			coords.highBottom,
			coords.avgTop,
			coords.avgBottom,
			false
		)
		avoidCollisonOffsetAvgLow = compareTwoLabels(
			coords.avgTop + avoidCollisionOffsetHighAvg,
			coords.avgBottom + avoidCollisionOffsetHighAvg,
			coords.lowTop,
			coords.lowBottom,
			false
		)
	}

	if (!avoidCollisionOffsetHighAvg && !avoidCollisonOffsetAvgLow) {
		return { high: 0, avg: 0, low: 0 }
	} else {
		if (avoidCollisionOffsetHighAvg && avoidCollisonOffsetAvgLow) {
			if (shiftLabelsUp) {
				return {
					high: avoidCollisionOffsetHighAvg * -1,
					avg: avoidCollisonOffsetAvgLow * -1,
					low: 0
				}
			}

			return {
				high: 0,
				avg: avoidCollisionOffsetHighAvg,
				low: avoidCollisonOffsetAvgLow
			}
		} else if (avoidCollisionOffsetHighAvg) {
			if (shiftLabelsUp) {
				return {
					high: 0,
					avg: avoidCollisionOffsetHighAvg * -1,
					low: 0
				}
			}
			return {
				high: 0,
				avg: avoidCollisionOffsetHighAvg,
				low: 0
			}
		} else {
			if (shiftLabelsUp) {
				return {
					high: 0,
					avg: avoidCollisonOffsetAvgLow * -1,
					low: 0
				}
			}
			return {
				high: 0,
				avg: 0,
				low: avoidCollisonOffsetAvgLow
			}
		}
	}
}

function compareTwoLabels(
	yTop: number,
	yBottom: number,
	yTop2: number,
	yBottom2: number,
	shiftLabelsUp: boolean
) {
	const result = findCollision(yTop, yBottom, yTop2, yBottom2)
	if (result == 'none') return 0
	if (shiftLabelsUp) {
		return Math.abs(yBottom2 - yTop)
	} else return Math.abs(yBottom - yTop2)
}

//y is the top of the rectangle, yy is the bottom.
function findCollision(
	yTop: number,
	yBottom: number,
	yTop2: number,
	yBottom2: number
) {
	let bottom = compareY(yTop, yBottom, yBottom2)
	let top = compareY(yTop, yBottom, yTop2)

	if (top) {
		return 'topHit'
	} else if (bottom) {
		return 'bottomhHit'
	} else return 'none'
}

function compareY(y: number, yy: number, y2: number) {
	return y < y2 && yy > y2
}
