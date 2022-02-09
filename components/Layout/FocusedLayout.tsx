import { Header } from 'components/Layout/Header/_Header'
import { Footer } from 'components/Layout/Footer/_Footer'
import { navMenuState } from 'components/Layout/Navigation/navMenuState'
import { useEffect } from 'react'
import { LayoutContextProvider } from './LayoutContext'
import { splitUrl } from 'functions/helpers/splitUrl'

type Props = {
	children: React.ReactNode
	hideTrial?: boolean
	url: string
}

/**
 * A layout that hides the left nav bar and centers the content
 * @param children The page content to display inside the layout
 * @returns
 */
export function FocusedLayout({ children, hideTrial, url }: Props) {
	const visible = navMenuState(state => state.visible)
	const close = navMenuState(state => state.close)

	// If visible, close the menu because it's not shown in the focused layout
	useEffect(() => {
		if (visible) close()
	}, [close, visible])

	return (
		<>
			<LayoutContextProvider value={{ url, path: splitUrl(url) }}>
				<Header hideNav={true} hideTrial={hideTrial} />
				<main id="main">{children}</main>
				<Footer />
			</LayoutContextProvider>
		</>
	)
}
