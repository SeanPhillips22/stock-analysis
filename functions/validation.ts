// Validate that a URL bit is valid, no ?/&/#
export const validateUrlBit = (bit: string | null | undefined) => {
	if (!bit) {
		return null
	}

	if (bit.charAt(0) === '#' || bit.charAt(0) === '?' || bit.charAt(0) === '%') {
		return null
	}

	return bit
}
