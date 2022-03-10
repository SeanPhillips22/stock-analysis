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
