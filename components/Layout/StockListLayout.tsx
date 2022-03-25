import { Layout } from 'components/Layout/_Layout'
import { SEO } from 'components/SEO'
import { usePageContext } from 'components/Markets/PageContext'
import { Sidebar } from './Sidebar/_Sidebar'

type Props = {
	children: React.ReactNode
	list?: string[]
}

export function StockListLayout({ children, list }: Props) {
	const { page } = usePageContext()

	return (
		<Layout url={page.path}>
			<SEO title={page.metaTitle} description={page.metaDescription} canonical={page.path} noindex={page.noindex} />
			<div className="contain">
				<h1 className="hh1 mb-0 border-b-[3px] border-blue-brand_sharp pb-3">{page.pageTitle || page.metaTitle}</h1>
				<div className="lg:right-sidebar mt-3 sm:mt-4 lg:mt-5">
					<div>{children}</div>
					<aside className="space-y-8 py-0">
						<Sidebar url={page.path} list={list} />
					</aside>
				</div>
			</div>
		</Layout>
	)
}
