import { ReactNode } from 'react'
import { Sidebar } from './Sidebar/_Sidebar'
import { Byline } from './Article/Byline'
import { Header } from 'components/Layout/Header/_Header'
import { Footer } from 'components/Layout/Footer/_Footer'
import { DisplayFooterAd } from 'components/Ads/Dianomi/DisplayFooterAd'
import { splitUrl } from 'functions/helpers/splitUrl'
import { LayoutContextProvider } from './LayoutContext'

interface Meta {
	title: string
	heading?: string
	description?: string
	image?: string
	date?: string
}

interface Props {
	meta: Meta
	url: string
	children: ReactNode
}

/**
 * The content/sidebar layout for articles and financial terms
 * @param {Meta} meta - The meta data for the page
 * @param {ReactNode} children - The content to be displayed
 * @return Component
 */

export const ArticleLayout = ({ meta, url, children }: Props) => {
	return (
		<>
			<LayoutContextProvider value={{ url: url, path: splitUrl(url) }}>
				<Header />
				<main id="main">
					<div className="contain lg:max-w-[1150px] mt-2 mb-6 mx-auto">
						<div className="lg:right-sidebar">
							<article className="text-page md:px-6">
								<header className="article-header">
									<h1>{meta.heading || meta.title}</h1>
									{meta.date && <Byline date={meta.date} />}
								</header>
								{children}
								<DisplayFooterAd />
							</article>
							<aside className="space-y-8 lg:pt-4">
								<Sidebar />
							</aside>
						</div>
					</div>
				</main>
				<Footer />
			</LayoutContextProvider>
		</>
	)
}
