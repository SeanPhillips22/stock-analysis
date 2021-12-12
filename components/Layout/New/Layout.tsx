import { Footer } from '../Footer/_Footer'
import { Header } from '../Header/_Header'
import { MainNav } from './MainNav'

type Props = {
	children: React.ReactNode
}

export function Layout({ children }: Props) {
	return (
		<div>
			<Header />
			<div className="lg:grid lg:grid-cols-leftnav">
				<aside className="hidden lg:block">
					<MainNav />
				</aside>
				<div>
					<main id="main" className="">
						{children}
					</main>
					<Footer />
				</div>
			</div>
		</div>
	)
}
