import { useSavedScreens } from './useSavedScreens'
import { DataId } from 'types/DataId'
import { ScreenerTypes } from 'components/Screener/screener.types'
import { SavedItem } from './SavedItem'
import { SaveScreen } from './SaveScreen'
import { Dropdown } from 'components/Dropdown/_Dropdown'

type SavedFilter = {
	id: DataId
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

export function SavedScreens({ type }: Props) {
	const { data } = useSavedScreens(type)
	const screeners = data && data.screeners[type]

	return (
		<div className="flex w-[50%] md:block md:w-auto">
			<div className="hidden text-sm font-medium text-gray-800 md:block">
				Saved Screens
			</div>
			<Dropdown
				title="Select saved"
				classes="py-0"
				menuClasses="grow"
				btnClasses="justify-between text-sm font-normal"
				icnClasses="text-gray-700"
			>
				<div className="thin-scroll max-h-80 overflow-y-auto overscroll-contain text-smaller">
					<SaveScreen type={type} />
					{screeners && Object.keys(screeners).length > 0 ? (
						<>
							<div className="divide-y">
								{Object.keys(screeners).map(key => {
									let screen = screeners[key] as Screen
									return (
										<SavedItem
											key={key}
											name={screen.name}
											type={type}
										/>
									)
								})}
							</div>
						</>
					) : (
						<div className="p-2 text-sm text-gray-700">
							No screens have been saved yet. Choose some filters, then
							enter a screen name and click Save.
						</div>
					)}
				</div>
			</Dropdown>
		</div>
	)
}
