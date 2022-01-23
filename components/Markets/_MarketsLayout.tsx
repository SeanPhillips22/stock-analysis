import { Layout } from 'components/Layout/_Layout'
import { SEO } from 'components/SEO'
import { usePageContext } from 'components/StockTable/PageContext'
import { MarketsNavigation } from './MarketsNavigation'

type Props = {
	children: React.ReactNode
}

export function MarketsLayout({ children }: Props) {
	const { page } = usePageContext()

	return (
		<Layout>
			<SEO
				title={page.metaTitle}
				description={page.metaDescription}
				canonical={page.path}
			/>
			<div className="contain">
				<h1 className="hh1">{page.parentTitle || page.title}</h1>
				<MarketsNavigation active={page.active || 'inactive'} />
				{children}
			</div>
		</Layout>
	)
}
