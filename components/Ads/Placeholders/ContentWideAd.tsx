import { isDev } from '../noAds'

export default function ContentWideAd() {
	if (isDev()) {
		return (
			<div className="ad-banner cw1">
				<div className="adph cw1"></div>
			</div>
		)
	}

	return null
}
