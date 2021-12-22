import { useSavedScreens } from './useSavedScreens'
import {
	FilterId,
	ScreenerTypes
} from 'components/StockScreener/screener.types'
import { SavedItem } from './SavedItem'
import { SaveScreen } from './SaveScreen'

type SavedFilter = {
	id: FilterId
	name: string
	value: string
}

type Screen = {
	name: string
	id: number
	filters: SavedFilter[]
}

type Props = {
	type: ScreenerTypes
}

export function SavedDropdown({ type }: Props) {
	const { data } = useSavedScreens(type)
	const screeners = data && data.screeners[type]

	return (
		<div className="max-h-80 overflow-y-auto overscroll-contain thin-scroll text-smaller">
			<SaveScreen type={type} />
			{screeners && Object.keys(screeners).length > 0 ? (
				<>
					<div className="divide-y">
						{Object.keys(screeners).map((key) => {
							let screen = screeners[key] as Screen
							return (
								<SavedItem key={key} name={screen.name} type={type} />
							)
						})}
					</div>
				</>
			) : (
				<div className="p-2 text-sm text-gray-700">
					No screens have been saved yet. Choose some filters, then enter a
					screen name and click Save.
				</div>
			)}
		</div>
	)
}
