/**
 * Pass two components to the function, they will be returned 50/50
 */
export function SplitTestComponents(A: React.FC, B: React.FC) {
	const rand = Math.random()
	console.log(rand)

	if (rand < 0.5) {
		return <A />
	} else {
		return <B />
	}
}

export function SplitTestAny(A: any, B: any) {
	const rand = Math.random()
	console.log(rand)

	if (rand < 0.5) {
		return A
	} else {
		return B
	}
}
