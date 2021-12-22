import { ReactNode } from 'react'
import { Layout } from './_Layout'

type Props = {
	children: ReactNode
}

export function ScreenerLayout({ children }: Props) {
	return (
		<Layout>
			<div className="contain py-5 xs:py-6">{children}</div>
		</Layout>
	)
}
