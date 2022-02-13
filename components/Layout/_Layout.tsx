import { LeftNav } from './Navigation/LeftNav'
import { DisplayFooterAd } from 'components/Ads/Dianomi/DisplayFooterAd'
import { Header } from 'components/Layout/Header/_Header'
import { Footer } from 'components/Layout/Footer/_Footer'
import { LayoutContextProvider } from './LayoutContext'
import { splitUrl } from 'functions/helpers/splitUrl'
// import { HeaderAd } from 'components/Ads/AdSense/HeaderAd'

type Props = {
	children: React.ReactNode
	url: string
	fullWidth?: boolean
}

export function Layout({ children, url, fullWidth }: Props) {
	return (
		<>
			<LayoutContextProvider value={{ url, path: splitUrl(url) }}>
				<div className="pagewrap">
					<Header />
					<div className={fullWidth ? 'mainbody fullwidth' : 'mainbody'}>
						<LeftNav />
						<div>
							{/* <HeaderAd /> */}
							<main id="main" className="maincol">
								{children}
							</main>
							<DisplayFooterAd />
						</div>
					</div>
					<Footer />
				</div>
			</LayoutContextProvider>
		</>
	)
}
