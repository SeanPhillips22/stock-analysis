import { LockClosedIcon } from 'components/Icons/LockClosedIcon'
import { ScreenerTypes } from 'components/Screener/screener.types'
import { useScreenerContext } from 'components/Screener/ScreenerContext'
import { useAuthState } from 'auth/useAuthState'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSavedScreens } from './useSavedScreens'

export function SaveScreen({ type }: { type: ScreenerTypes }) {
	const { state } = useScreenerContext()
	const { checked, isPro } = useAuthState()
	const { add, msg, err, setErr, clearMessages } = useSavedScreens(type)
	const router = useRouter()
	const [name, setName] = useState('')

	async function handleSubmit(name: string) {
		clearMessages()
		if (checked && !isPro) {
			router.push('/pro/')
		} else {
			if (!name) {
				setErr('Please enter a name')
			} else if (!state.filters || !state.filters.length) {
				setErr('No filters have been set')
			} else {
				add.mutate(name)
				setName('')
			}
		}
	}

	return (
		<>
			<div className="flex flex-row">
				<input
					type="text"
					placeholder="Enter screen name"
					className="grow border-gray-200 text-sm text-gray-700 focus:border-blue-300 focus:ring-0"
					value={name}
					onChange={e => {
						setName(e.target.value)
						clearMessages()
					}}
					onKeyPress={e => {
						if (e.key === 'Enter') {
							handleSubmit(name)
						}
					}}
				/>
				<button
					className="flex items-center bg-gray-500 px-3 text-sm font-medium text-white hover:bg-blue-brand_sharp"
					onClick={() => handleSubmit(name)}
				>
					Save
					{!isPro && <LockClosedIcon className="ml-1 h-4 w-4 text-white" aria-hidden="true" />}
				</button>
			</div>
			{msg && <div className="border-l-2 border-green-400 bg-green-50 p-2 text-sm text-green-700">{msg}</div>}
			{err && <div className="border-l-2 border-red-400 bg-red-50 p-2 text-sm text-red-700">{err}</div>}
		</>
	)
}
