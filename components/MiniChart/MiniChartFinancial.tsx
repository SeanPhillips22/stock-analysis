import React, { CSSProperties, FillOpacity } from 'react'
import { intersect } from './functions/intersect'

type MiniChartFinancialProps = {
	prevCloseCoords: { x: number; y: number }
	points: Array<{ x: number; y: number }>
	color: string
	style: CSSProperties
}

export function MiniChartFinancial({ prevCloseCoords, points, color, style }: MiniChartFinancialProps) {
	const prevCloseCoordsWithOffset = prevCloseCoords.y + 3

	const redOrGreen = (value: number, prevClose: number) => {
		if (value < prevClose) return 'green'
		return 'red'
	}

	const linePoints: any[] = points.map(p => [p.x, p.y]).reduce((a, b) => a.concat(b))

	const lineStyle = {
		stroke: color || style.stroke || 'none',
		strokeWidth: style.strokeWidth || '1',
		strokeLinejoin: style.strokeLinejoin || 'round',
		strokeLinecap: style.strokeLinecap || 'round',
		fill: 'none'
	}
	let fillOpacity: FillOpacity

	fillOpacity = style.fillOpacity || '.1'
	//Split each portion that is differently colored into an array of its own.
	let arrayOfLineSegments: any[] = [[]]
	let colorArray: any[] = []
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
			if (intersectPoint) {
				arrayOfLineSegments[arrayIndicator].push(intersectPoint.x)
				arrayOfLineSegments[arrayIndicator].push(intersectPoint.y)
			}
			arrayIndicator++
			arrayOfLineSegments.push([])
			colorArray.push(redOrGreen(linePoints[i], prevCloseCoordsWithOffset))
			if (intersectPoint) {
				arrayOfLineSegments[arrayIndicator].push(intersectPoint.x)
				arrayOfLineSegments[arrayIndicator].push(intersectPoint.y)
			}
			arrayOfLineSegments[arrayIndicator].push(linePoints[i - 1])
			arrayOfLineSegments[arrayIndicator].push(linePoints[i])
		}
	}

	return (
		<>
			{' '}
			{arrayOfLineSegments.map((p, i) => {
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
								fillOpacity: fillOpacity,
								fill: colorArray[i] || color || 'none',
								pointerEvents: 'none'
							}}
						/>
					</g>
				)
			})}{' '}
		</>
	)
}
