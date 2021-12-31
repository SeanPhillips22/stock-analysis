import { LeftNav } from './Navigation/LeftNav'
import { DisplayFooterAd } from 'components/Ads/Dianomi/DisplayFooterAd'
import { Header } from 'components/Layout/Header/_Header'
import { Footer } from 'components/Layout/Footer/_Footer'
// import { HeaderAd } from 'components/Ads/Snigel/HeaderAd'

type Props = {
	children: React.ReactNode
	fullWidth?: boolean
}

// TODO enable header ad before launching
export function Layout({ children, fullWidth }: Props) {
	return (
		<>
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
		</>
	)
}
