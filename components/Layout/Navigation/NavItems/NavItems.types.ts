import { SVGProps } from 'react'
import { PathObject } from 'state/navState'

export type NavItemChild = {
	name: string
	href: string
}

export type NavItemProps = {
	item: {
		name: string
		href: string
		icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
		children?: NavItemChild[]
	}
	path: PathObject
}
