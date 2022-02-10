import { ReactNode } from 'react'
import { Sidebar } from './Sidebar/_Sidebar'
import { Byline } from './Article/Byline'
import { Layout } from './_Layout'

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

export function ArticleLayout({ meta, url, children }: Props) {
	return (
		<>
			<Layout url={url}>
				<div className="contain mx-auto mt-2 mb-1 pb-1">
					<div className="lg:right-sidebar">
						<article className="text-page lg:px-6">
							<header className="article-header">
								<h1>{meta.heading || meta.title}</h1>
								{meta.date && <Byline date={meta.date} />}
							</header>
							{children}
						</article>
						<aside className="space-y-8 lg:pt-4">
							<Sidebar />
						</aside>
					</div>
				</div>
			</Layout>
		</>
	)
}
