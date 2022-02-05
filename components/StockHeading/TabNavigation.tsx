import { Router } from 'next/router'
import { useRef } from 'react'
import { menuState } from 'state/menuState'
import { Tab } from './Tab'

type Props = {
	symbol: string
	hideChart: boolean
}

export function TabNavigation({ symbol, hideChart }: Props) {
	const menuref = useRef<HTMLUListElement>(null)
	const pos = menuState(state => state.pos)
	const setPos = menuState(state => state.setPos)

	Router.events.on('routeChangeStart', () => {
		setPos(menuref.current?.scrollLeft || 0)
	})

	Router.events.on('routeChangeComplete', () => {
		if (menuref.current) {
			menuref.current.scrollLeft = pos || 0
		}
	})

	return (
		<nav className="border-b-2 border-blue-brand_sharp w-full">
			<ul className="navmenu" ref={menuref}>
				<Tab symbol={symbol} title="Overview" append="" />
				<Tab symbol={symbol} title="Financials" append="financials" />
				<Tab symbol={symbol} title="Statistics" append="statistics" />
				<Tab symbol={symbol} title="Dividends" append="dividend" />
				<Tab symbol={symbol} title="Profile" append="company" />
				{!hideChart && <Tab symbol={symbol} title="Chart" append="chart" />}
			</ul>
		</nav>
	)
}
