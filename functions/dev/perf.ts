// Measure the performance of a function performed 1000 times
export const measure = (fn: any, label: string) => {
	const start: any = console.time(label)
	for (let i = 0; i < 1000; i++) {
		fn()
	}
	const end: any = console.timeEnd(label)
	return end - start // console.log(`${label} took: ${end - start}ms`)
}

// function oldFn() {
// 	const datetime = new Date('Feb 9, 2022 10:48')
// 	const date = datetime.toLocaleString('en-US', {
// 		hour: 'numeric',
// 		minute: '2-digit'
// 	})
// 	return date
// }

// function newFn() {
// 	const dt = new Date('Feb 9, 2022 10:48')
// 	let hour = dt.getHours()
// 	let minute: string | number = dt.getMinutes()

// 	// Add zero in front of minutes < 10
// 	if (minute < 10) minute = '0' + minute

// 	// Decide whether to append AM (9-11AM) or PM (12-4PM)
// 	if (hour < 12) return `${hour}:${minute} AM`
// 	if (hour === 12) return `${hour}:${minute} PM`
// 	if (hour > 12) return `${hour - 12}:${minute} PM`
// 	return ''
// }

// measure(oldFn, 'oldFn')
// measure(newFn, 'newFn')
