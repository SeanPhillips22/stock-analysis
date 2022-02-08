import { ReactNode } from 'react'
import { Layout } from './_Layout'

type Props = {
	children: ReactNode
	url: string
}

export function ScreenerLayout({ children, url }: Props) {
	return (
		<Layout url={url}>
			<div className="contain py-5 xs:py-6">{children}</div>
		</Layout>
	)
}
