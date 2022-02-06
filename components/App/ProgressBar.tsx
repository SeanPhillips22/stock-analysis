import Router from 'next/router'
import NProgress from 'nprogress'

/**
 * Show a progress bar at the top of the page when navigating between pages
 */
export function ProgressBar() {
	NProgress.configure({ showSpinner: false })
	Router.events.on('routeChangeStart', () => {
		NProgress.start()
	})

	Router.events.on('routeChangeComplete', () => {
		NProgress.done()
	})
	Router.events.on('routeChangeError', () => NProgress.done())

	return null
}
