import { LeftNav } from './Navigation/LeftNav'
import { DisplayFooterAd } from 'components/Ads/Dianomi/DisplayFooterAd'

type Props = {
	children: React.ReactNode
}

export function Layout({ children }: Props) {
	return (
		<>
			<div className="mainbody">
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
