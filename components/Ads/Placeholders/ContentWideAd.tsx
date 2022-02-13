import { isDev } from '../noAds'

export default function ContentWideAd() {
	if (isDev()) {
		return (
			<div className="ad-banner ftadw">
				<div className="adph ftad"></div>
			</div>
		)
	}

	return null
}
