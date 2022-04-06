import mean from './mean'

// eslint-disable-next-line import/no-anonymous-default-export
export default data => {
	const dataMean = mean(data)
	const sqDiff = data.map(n => Math.pow(n - dataMean, 2))
	const avgSqDiff = mean(sqDiff)
	return Math.sqrt(avgSqDiff)
}
