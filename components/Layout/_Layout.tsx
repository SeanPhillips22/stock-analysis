import { LeftNav } from './Navigation/LeftNav'
import { DisplayFooterAd } from 'components/Ads/Dianomi/DisplayFooterAd'
import { Header } from 'components/Layout/Header/_Header'
import { Footer } from 'components/Layout/Footer/_Footer'

type Props = {
	children: React.ReactNode
	fullWidth?: boolean
}

export function Layout({ children, fullWidth }: Props) {
	return (
		<>
			<Header />
			<div className={fullWidth ? 'mainbody fullwidth' : 'mainbody'}>
				<LeftNav />
				<div>
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
