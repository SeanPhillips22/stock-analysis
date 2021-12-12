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
				<aside className="hidden xxl:block border-r border-gray-200">
					<LeftNav />
				</aside>
				<div>
					<main id="main">{children}</main>
				</div>
				{/* <aside className="flex flex-col border-l border-gray-200">
					Side 2
				</aside> */}
			</div>
			<Footer />
		</>
	)
}
