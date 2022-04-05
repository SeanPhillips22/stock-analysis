import { useEvent } from 'hooks/useEvent'
import { useEffect } from 'react'

function Error({ statusCode }: any) {
	const { event } = useEvent()

	useEffect(() => {
		event('Error', { statusCode })
	}, [event, statusCode])

	return <p>{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}</p>
}

Error.getInitialProps = ({ res, err }: any) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404
	return { statusCode }
}

export default Error
