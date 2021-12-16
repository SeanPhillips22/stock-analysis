import { LeftNav } from './Navigation/LeftNav'
import { DisplayFooterAd } from 'components/Ads/Dianomi/DisplayFooterAd'
import { Header } from 'components/Layout/Header/_Header'
import { HeaderNew } from 'components/Layout/Header/_HeaderNew'
import { Footer } from 'components/Layout/Footer/_Footer'

type Props = {
	children: React.ReactNode
	fullWidth?: boolean
}

export function Layout({ children, fullWidth }: Props) {
	return (
		<>
			<HeaderNew />
			<div className={fullWidth ? 'mainbody fullwidth' : 'mainbody'}>
				<LeftNav />
				<main id="main" className="maincol">
					{children}
					<DisplayFooterAd />
				</main>
			</div>
			<Footer />
		</>
	)
}
