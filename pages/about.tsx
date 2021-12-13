/* eslint-disable @next/next/no-img-element */

import { SEO } from 'components/SEO'
import { AboutHero } from 'components/About/Hero'
import { AboutFeatures } from 'components/About/Features'
import { AboutTeam } from 'components/About/Team'
import { AboutActions } from 'components/About/Actions'
import { AboutDetails } from 'components/About/Details'

export default function FrontPage() {
	return (
		<>
			<SEO
				title="About"
				description="Welcome to Stock Analysis — a site that aims to be the internet’s best source of free stock data and information for regular investors."
				canonical="/about/"
			/>
			<main id="main">
				<AboutHero />
				<AboutFeatures />
				<AboutTeam />
				<AboutActions />
				<AboutDetails />
			</main>
		</>
	)
}
