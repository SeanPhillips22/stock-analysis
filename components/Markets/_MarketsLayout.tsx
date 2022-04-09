import { Layout } from 'components/Layout/_Layout'
import { SEO } from 'components/SEO'
import { usePageContext } from 'components/Markets/PageContext'
import { MarketsNavigation } from './Navigation/_MarketsNavigation'

type Props = {
	children: React.ReactNode
	SubNav?: React.FunctionComponent<any>
}

export function MarketsLayout({ children, SubNav }: Props) {
	const { page } = usePageContext()

	return (
		<Layout url={page.path}>
			<SEO title={page.metaTitle} description={page.metaDescription} canonical={page.path} />
			<div className="contain">
				<div className="hh1">Market Movers</div>
				<MarketsNavigation path={page.path} SubNav={SubNav} />
				<div className="flex flex-col space-y-4 xs:space-y-5 sm:space-y-7">{children}</div>
			</div>
		</Layout>
	)
}
