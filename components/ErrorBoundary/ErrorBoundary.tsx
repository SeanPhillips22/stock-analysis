import { Component } from 'react'
import { ErrorFallback } from './ErrorFallback'

type Props = any
type State = any

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props)

		// Define a state variable to track whether is an error or not
		this.state = { hasError: false }
	}
	static getDerivedStateFromError() {
		// Update state so the next render will show the fallback UI
		return { hasError: true }
	}

	componentDidCatch(error: any, errorInfo: any) {
		// You can use your own error logging service here

		this.setState({ error })
		console.log({ error, errorInfo })
	}
	render() {
		// Check if the error is thrown
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <ErrorFallback props={this.state} />
		}

		// Return children components in case of no error
		return this.props.children
	}
}

export default ErrorBoundary
