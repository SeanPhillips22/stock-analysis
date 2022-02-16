import { ReactNode } from 'react'
import { ActionsNavigation } from 'components/Actions/ActionsNavigation'
import { ActionsNavigationSub } from 'components/Actions/ActionsNavigationSub'
import { Sidebar } from 'components/Layout/Sidebar/_Sidebar'
import { Layout } from 'components/Layout/_Layout'

type Props = {
	children: ReactNode
	url: string
}

export function ActionsLayout({ children, url }: Props) {
	return (
		<>
			<Layout url={url}>
				<div className="contain py-5 xs:py-6">
					<h1 className="hh1">Corporate Actions</h1>
					<ActionsNavigation />

					<div className="lg:right-sidebar">
						<div className="py-1.5">
							<ActionsNavigationSub />
							{children}
						</div>
						<aside className="flex flex-col space-y-10 py-6">
							<Sidebar url={url} />
						</aside>
					</div>
				</div>
			</Layout>
		</>
	)
}
