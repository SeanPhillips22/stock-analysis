/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { screenerState } from 'components/StockScreener/screener.state'
import { useState } from 'react'
import { ScreenerTypes } from 'components/StockScreener/screener.types'
import { supabase } from 'functions/supabase'
import { useAuthState } from 'hooks/useAuthState'

// if there are no saved screens, return this initial state
const initialState = {
	count: 0,
	screeners: {
		stocks: {},
		ipo: {},
		etf: {}
	}
}

/**
 * These functions handle the logic of fetching, adding and deleting saved screens
 * @param type What the screener is for (stock, ipo, etf)
 * @returns
 */
export function useSavedScreens(type: ScreenerTypes) {
	const { user } = useAuthState()
	const filters = screenerState(state => state.filters)
	const [msg, setMsg] = useState('')
	const [err, setErr] = useState('')
	const queryClient = useQueryClient()

	// Fetch all the saved screens
	async function fetchScreener() {
		let { data: fetchedData } = await supabase
			.from('userdata')
			.select('screener')

		if (!fetchedData![0].screener) {
			await supabase
				.from('userdata')
				.update({ screener: initialState })
				.eq('id', user?.id)

			return initialState
		}

		return fetchedData![0].screener
	}

	const { data } = useQuery(['screener', type], () => fetchScreener(), {
		refetchOnWindowFocus: false,
		enabled: user ? true : false
	})

	function clearMessages() {
		setMsg('')
		setErr('')
	}

	async function addScreen(name: string) {
		clearMessages()

		let save = filters.map(filter => {
			return { id: filter.id, value: filter.value }
		})

		data.count = data.count + 1 // always increment by 1 to give screens a unique ID
		data.screeners[type][name] = {
			// add the new screen to the screener
			id: data.count,
			name: name,
			filters: save
		}

		let { error } = await supabase
			.from('userdata')
			.update({ screener: data })
			.eq('id', user?.id)

		if (error) {
			setErr(
				'There was an error, try again or email support@stockanalysis.com'
			)
		} else {
			setMsg('Successfully saved new screen: ' + name)
			setTimeout(() => {
				clearMessages()
			}, 5000)
		}
	}

	async function deleteScreen(name: string) {
		clearMessages()

		delete data.screeners[type][name]
		let { error } = await supabase
			.from('userdata')
			.update({ screener: data })
			.eq('id', user?.id)

		if (error) {
			setErr(
				'There was an error, try again or email support@stockanalysis.com'
			)
		}
	}

	const add = useMutation((name: string) => addScreen(name), {
		onSuccess: () => {
			queryClient.invalidateQueries('screener')
		}
	})

	const del = useMutation((name: string) => deleteScreen(name), {
		onSuccess: () => {
			queryClient.invalidateQueries('screener')
		}
	})

	return {
		data,
		add,
		del,
		msg,
		setMsg,
		err,
		setErr,
		clearMessages
	}
}
