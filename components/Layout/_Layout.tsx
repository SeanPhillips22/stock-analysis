import { LeftNav } from './Navigation/LeftNav'
import { DisplayFooterAd } from 'components/Ads/Dianomi/DisplayFooterAd'

type Props = {
	children: React.ReactNode
	fullWidth?: boolean
}

export function Layout({ children, fullWidth }: Props) {
	return (
		<>
			<div className={fullWidth ? 'mainbody fullwidth' : 'mainbody'}>
				<aside className="leftcol">
					<LeftNav />
				</aside>
				<main id="main" className="maincol">
					{children}
					<DisplayFooterAd />
				</main>
			</div>
		</>
	)
}
