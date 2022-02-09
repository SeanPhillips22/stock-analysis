import { SVGProps } from 'react'
import { PathType } from 'types/Path'

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
	path: PathType
}
