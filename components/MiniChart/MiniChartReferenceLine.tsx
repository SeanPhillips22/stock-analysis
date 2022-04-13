import React from 'react'

type MiniChartReferenceProps = {
	prevCloseCoords: { x: number; y: number }
	points: Array<{ x: number; y: number }>
	margin: number
	style: any
}

export function MiniChartReferenceLine({ prevCloseCoords, points, margin, style }: MiniChartReferenceProps) {
	return (
		<line
			x1={points[0].x}
			y1={prevCloseCoords.y + margin}
			x2={points[points.length - 1].x}
			y2={prevCloseCoords.y + margin}
			style={style}
		/>
	)
}
