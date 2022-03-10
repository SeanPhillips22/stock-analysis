import { ReactNode } from 'react'
import { Sidebar } from './Sidebar/_Sidebar'
import { Layout } from './_Layout'

interface Props {
	heading: string
	children: ReactNode
	url: string
	list?: string[]
}

export const LayoutSidebar = ({ heading, children, url, list }: Props) => {
	return (
		<Layout url={url}>
			<div className="contain py-5 xs:py-6">
				<h1 className="hh1 mb-0 border-b-[3px] border-blue-brand_sharp pb-3">
					{heading}
				</h1>

				<div className="lg:right-sidebar mt-3 sm:mt-4 lg:mt-5">
					<div className="">{children}</div>
					<aside className="space-y-8 py-0">
						<Sidebar url={url} list={list} />
					</aside>
				</div>
			</div>
		</Layout>
	)
}
