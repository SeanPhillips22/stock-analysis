import { isDev } from '../noAds'

export default function ContentMobileAd() {
	if (isDev()) {
		return (
			<div className="ad-banner m-1">
				<div className="adph m-1"></div>
			</div>
		)
	}

	return null
}
