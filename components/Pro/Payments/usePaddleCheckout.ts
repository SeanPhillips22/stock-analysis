import { useEffect } from 'react'

// Vendor IDs
// Production: 128917
// Sandbox: 2545

export function usePaddleCheckout() {
	useEffect(() => {
		const paddleJs = document.createElement('script')
		paddleJs.src = 'https://cdn.paddle.com/paddle/paddle.js'
		document.body.appendChild(paddleJs)

		paddleJs.onload = () => {
			// eslint-disable-next-line no-undef
			// eslint-disable-next-line new-cap
			window.Paddle.Setup({ vendor: 128917 })
		}
	}, [])
}
