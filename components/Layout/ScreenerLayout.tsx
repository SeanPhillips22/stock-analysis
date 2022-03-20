import { SEO } from 'components/SEO'
import { ReactNode } from 'react'
import { Layout } from './_Layout'

type Props = {
	url: string
	children: ReactNode
	title?: string
	description?: string
}

export function ScreenerLayout({ url, children, title, description }: Props) {
	return (
		<Layout url={url}>
			{/* SEO Config */}
			{title && <SEO title={title} description={description} canonical={url} />}

			<div className="contain py-5 xs:py-6">{children}</div>
		</Layout>
	)
}
