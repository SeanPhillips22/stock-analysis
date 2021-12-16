import { navMenuState } from 'state/navMenuState'
import { MainNav } from './MainNav'

export function LeftNav() {
	const visible = navMenuState((state) => state.visible)

	return (
		<aside className={visible ? 'leftcol showmenu' : 'leftcol'}>
			<div className="leftnav">
				<MainNav />
			</div>
		</aside>
	)
}
