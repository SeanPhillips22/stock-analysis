import PropTypes from 'prop-types'
import React from 'react'

export default class SparklinesReferenceLine extends React.Component {
	static propTypes = {
		type: PropTypes.oneOf(['max', 'min', 'mean', 'avg', 'median', 'custom']),
		value: PropTypes.number,
		style: PropTypes.object
	}

	static defaultProps = {
		type: 'mean',
		style: { stroke: 'red', strokeOpacity: 0.75, strokeDasharray: '2, 2' }
	}

	render() {
		const { prevCloseCoords, points, margin, style } = this.props

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
}
