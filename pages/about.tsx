/* eslint-disable @next/next/no-img-element */

import { SEO } from 'components/SEO'
import { AboutHero } from 'components/About/Hero'
import { AboutFeatures } from 'components/About/Features'
import { AboutTeam } from 'components/About/Team'
import { AboutActions } from 'components/About/Actions'
import { FocusedLayout } from 'components/Layout/FocusedLayout'

export default function FrontPage() {
	return (
		<>
			<SEO
				title="About"
				description="Welcome to Stock Analysis — a site that aims to be the internet’s best source of free stock data and information for regular investors."
				canonical="/about/"
			/>
			<FocusedLayout url="/about/">
				<AboutHero />
				<AboutFeatures />
				<AboutTeam />
				<AboutActions />
			</FocusedLayout>
		</>
	)
}
