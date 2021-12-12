import { Footer } from './Footer/_Footer'
import { Header } from './Header/_Header'
import { LeftNav } from './New/LeftNav'

type Props = {
	children: React.ReactNode
}

export function Layout({ children }: Props) {
	return (
		<>
			<Header />
			<div className="xxl:grid xxl:grid-cols-leftnav">
				<aside className="hidden xxl:block">
					<LeftNav />
				</aside>
				<div>
					<main id="main">{children}</main>
					<Footer />
				</div>
			</div>
		</>
	)
}
