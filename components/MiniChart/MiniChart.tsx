import React from 'react'

import { MiniChartLine } from './MiniChartLine'
import { MiniChartReferenceLine } from './MiniChartReferenceLine'
import { MiniChartFinancial } from './MiniChartFinancial'
import { dataToPoints } from './functions/dataToPoints'

type propTypes = {
	type: string
	previousClose: number | null
	data: number[]
	width?: number
	height?: number
	margin: number
	style: any
	onMouseMove: any
}

export function MiniChart({ type, previousClose, data, width, height, margin, style }: propTypes) {
	if (data.length === 0) return null
	if (previousClose === null) return null
	const limit = 0

	margin = margin !== undefined ? margin : 2
	width = width !== undefined ? width : 240
	height = height !== undefined ? height : 60

	data.push(previousClose)
	const points = dataToPoints({ data, limit, width, height, margin })

	const prevCloseCoords: { x: number; y: number } | undefined = points.pop()

	if (typeof prevCloseCoords === 'undefined') return null

	data.pop()

	const svgOpts = {
		style: style,
		viewBox: `0 0 ${width} ${height}`,
		preserveAspectRatio: 'none'
	}

	return (
		<svg {...svgOpts}>
			{type == 'line' ? (
				<MiniChartLine
					data={data}
					points={points}
					color="green"
					style={style}
					onMouseMove={null}
					height={height}
					margin={margin}
				/>
			) : (
				<MiniChartFinancial prevCloseCoords={prevCloseCoords} points={points} color="green" style={style} />
			)}
			<MiniChartReferenceLine
				prevCloseCoords={prevCloseCoords}
				points={points}
				margin={margin}
				style={{ stroke: '#444', strokeOpacity: 1, strokeWidth: 2, strokeDasharray: '4, 5' }}
			/>
		</svg>
	)
}
