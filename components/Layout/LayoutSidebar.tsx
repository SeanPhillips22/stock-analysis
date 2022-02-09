import { ReactNode } from 'react'
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs'
import { Sidebar } from './Sidebar/_Sidebar'
import { Layout } from './_Layout'

interface Props {
	heading: string
	children: ReactNode
	url: string
}

export const LayoutSidebar = ({ heading, children, url }: Props) => {
	return (
		<Layout url={url}>
			<div className="contain py-5 xs:py-6">
				<Breadcrumbs url={url} />
				<h1 className="hh1 border-b-[3px] border-blue-brand_sharp pb-3 mb-0">
					{heading}
				</h1>

				<div className="lg:right-sidebar mt-3 sm:mt-4 lg:mt-5">
					<div className="">{children}</div>
					<aside className="py-0 space-y-8">
						<Sidebar />
					</aside>
				</div>
			</div>
		</Layout>
	)
}
