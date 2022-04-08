import PropTypes from 'prop-types'
import React from 'react'

function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
	// Check if none of the lines are of length 0
	if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
		return false
	}

	let denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1)

	// Lines are parallel
	if (denominator === 0) {
		return false
	}

	let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
	let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

	// is the intersection along the segments
	if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
		return false
	}

	// Return a object with the x and y coordinates of the intersection
	let x = x1 + ua * (x2 - x1)
	let y = y1 + ua * (y2 - y1)

	return { x, y }
}

export default class SparklinesLine extends React.Component {
	static propTypes = {
		color: PropTypes.string,
		style: PropTypes.object
	}

	static defaultProps = {
		style: {},
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		onMouseMove: () => {}
	}

	render() {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { prevCloseCoords, points, color, style } = this.props

		const prevCloseCoordsWithOffset = prevCloseCoords.y + 3

		const redOrGreen = (value, prevClose) => {
			if (value < prevClose) return 'green'
			return 'red'
		}

		const linePoints = points.map(p => [p.x, p.y]).reduce((a, b) => a.concat(b))

		const lineStyle = {
			stroke: color || style.stroke || 'none',
			strokeWidth: style.strokeWidth || '1',
			strokeLinejoin: style.strokeLinejoin || 'round',
			strokeLinecap: style.strokeLinecap || 'round',
			fill: 'none'
		}

		//Split each portion that is differently colored into an array of its own.
		let arrayOfLineSegments = [[]]
		let colorArray = []
		let arrayIndicator = 0

		for (let i = 1; i < linePoints.length - 1; i += 2) {
			//Start condition, new color is added at start.
			if (arrayOfLineSegments[arrayIndicator].length == 0) {
				colorArray.push(redOrGreen(linePoints[i], prevCloseCoordsWithOffset))
			}

			// See if the color has changed, if not, add into into the same array.
			if (redOrGreen(linePoints[i], prevCloseCoordsWithOffset) == colorArray[arrayIndicator]) {
				arrayOfLineSegments[arrayIndicator].push(linePoints[i - 1])
				arrayOfLineSegments[arrayIndicator].push(linePoints[i])
			} else {
				//Create a new array, add an intersection point on prev line (so that the colors don't cross into each other)
				let intersectPoint = intersect(
					linePoints[i - 3],
					linePoints[i - 2],
					linePoints[i - 1],
					linePoints[i],
					linePoints[0],
					prevCloseCoordsWithOffset,
					linePoints[linePoints.length - 2],
					prevCloseCoordsWithOffset
				)
				arrayOfLineSegments[arrayIndicator].push(intersectPoint.x)
				arrayOfLineSegments[arrayIndicator].push(intersectPoint.y)
				arrayIndicator++
				arrayOfLineSegments.push([])
				colorArray.push(redOrGreen(linePoints[i], prevCloseCoordsWithOffset))
				arrayOfLineSegments[arrayIndicator].push(intersectPoint.x)
				arrayOfLineSegments[arrayIndicator].push(intersectPoint.y)
				arrayOfLineSegments[arrayIndicator].push(linePoints[i - 1])
				arrayOfLineSegments[arrayIndicator].push(linePoints[i])
			}
		}

		const colorPoints = arrayOfLineSegments.map((p, i) => {
			lineStyle.stroke = colorArray[i]
			let closePolyPoints = [
				arrayOfLineSegments[i][arrayOfLineSegments[i].length - 2],
				prevCloseCoordsWithOffset,
				0,
				prevCloseCoordsWithOffset,
				0,
				arrayOfLineSegments[i][1]
			]

			return (
				<g key={i}>
					<polyline points={p.join(' ')} style={{ stroke: colorArray[i], strokeWidth: 2.5, fill: 'none' }} />
					<polyline
						points={arrayOfLineSegments[i].concat(closePolyPoints).join(' ')}
						style={{
							stroke: colorArray[i],
							strokeWidth: '0',
							fillOpacity: style.fillOpacity || '.1',
							fill: colorArray[i] || color || 'none',
							pointerEvents: 'none'
						}}
					/>
				</g>
			)
		})

		return colorPoints
	}
}
