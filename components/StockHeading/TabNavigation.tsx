import { Router } from 'next/router'
import { useRef } from 'react'
import { menuState } from 'state/menuState'
import { Info } from 'types/Info'
import { Tab } from './Tab'

type Props = {
	info: Info
	hideChart: boolean
}

export function TabNavigation({ info, hideChart }: Props) {
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
		<nav className="w-full border-b-2 border-blue-brand_sharp">
			<ul className="navmenu" ref={menuref}>
				<Tab symbol={info.symbol} title="Overview" append="" />
				<Tab symbol={info.symbol} title="Financials" append="financials" />
				<Tab symbol={info.symbol} title="Statistics" append="statistics" />
				{!info.exceptions.hideForecast && <Tab symbol={info.symbol} title="Forecast" append="forecast" />}
				<Tab symbol={info.symbol} title="Dividends" append="dividend" />
				<Tab symbol={info.symbol} title="Profile" append="company" />
				{!hideChart && <Tab symbol={info.symbol} title="Chart" append="chart" />}
			</ul>
		</nav>
	)
}
