import { Layout } from 'components/Layout/_Layout'
import { SEO } from 'components/SEO'
import { PageConfig } from 'types/PageConfig'
import { MarketsNavigation } from './MarketsNavigation'

type Props = {
	config: PageConfig
	children: React.ReactNode
}

export function MarketsLayout({ config, children }: Props) {
	return (
		<Layout>
			<SEO title={config.metaTitle} canonical={config.path} />
			<div className="contain">
				<h1 className="hh1">{config.parentTitle || config.title}</h1>
				<MarketsNavigation active={config.active || 'inactive'} />
				{children}
			</div>
		</Layout>
	)
}
