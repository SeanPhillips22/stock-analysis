import { useState, useEffect, useRef } from 'react'
import { SearchIcon } from 'components/Icons/Search'
import { SingleResult } from './SingleResult'
import { useRouter } from 'next/router'
import { getData } from 'functions/apis/API'
import { CloseIcon } from 'components/Icons/Close'
import { useDebounce } from 'hooks/useDebounce'
import { useSearch } from './useSearch'
import { searchState } from './SiteSearch.state'
import { FullTextSearch } from './FullTextSearch'

export function SiteSearch() {
	const router = useRouter()
	const inputRef = useRef<HTMLInputElement>(null)
	const [query, setQuery] = useState('')
	const debouncedQuery = useDebounce<string>(query, 150)
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)
	const [error, setError] = useState(false)
	const fetched = searchState(state => state.fetched)
	const setFetched = searchState(state => state.setFetched)
	const trending = searchState(state => state.trending)
	const setTrending = searchState(state => state.setTrending)
	const { results, filtering } = useSearch(debouncedQuery, trending)
	let num = 1

	// Fetch the site index
	async function fetchIndex() {
		setError(false)
		setFetched(true)
		if (!loading) {
			try {
				setLoading(true)
				const trendingData = await getData('trending?q=top')
				setTrending(trendingData)
				await fetch('https://api.stockanalysis.com/search?q=getready', {
					mode: 'no-cors'
				})
			} catch (error) {
				setError(true)
				return console.error(error)
			} finally {
				setLoading(false)
			}
		}
	}

	function keyClick(e: KeyboardEvent) {
		const active = document.querySelector('.activeresult')

		const keyref = inputRef.current ?? null

		switch (e.key) {
			case 'Escape':
			case 'Tab':
				{
					if (keyref) {
						e.preventDefault()
						keyref.blur()
						setOpen(false)
					}
				}
				break

			case 'ArrowDown':
				{
					e.preventDefault()
					if (num < results.length) {
						if (active) {
							active.classList.remove('activeresult')
						}
						num++
						const next: HTMLLinkElement | null = document.querySelector(
							'[data-num="' + num + '"]'
						)
						if (next) {
							next.classList.add('activeresult')
							next.focus()
							if (keyref) {
								keyref.focus()
							}
						}
					}
				}
				break

			case 'ArrowUp':
				{
					e.preventDefault()
					if (num > 1) {
						if (active) {
							active.classList.remove('activeresult')
						}
						num--
						const next: HTMLLinkElement | null = document.querySelector(
							'[data-num="' + num + '"]'
						)
						if (next) {
							next.classList.add('activeresult')
							next.focus()
							if (keyref) {
								keyref.focus()
							}
						}
					}
				}
				break

			case 'Enter':
				{
					const activeResult: HTMLLinkElement | null =
						document.querySelector('.activeresult') ?? null
					if (activeResult) {
						e.preventDefault()
						const selected = activeResult.href
						const selectedUrl = new URL(selected)
						const selectedPath = selectedUrl.pathname
						router.push(selectedPath)
						setOpen(false)
						if (keyref) {
							keyref.blur()
						}
					}
				}
				break
		}
	}

	function mouseClick(e: MouseEvent) {
		const formref = inputRef.current ?? null
		const results = document.querySelector('.results-wrap') ?? null

		if (
			(formref && formref.contains(e.target as Node)) ||
			(results && results.contains(e.target as Node))
		) {
			return
		}
		setOpen(false)
	}

	function clearInput(e: any) {
		e.preventDefault()
		setQuery('')
		const keyref = inputRef.current ?? null
		if (keyref) {
			keyref.focus()
		}
	}

	useEffect(() => {
		if (open) {
			document.addEventListener('keydown', keyClick)
			document.addEventListener('mousedown', mouseClick)
		} else {
			document.removeEventListener('keydown', keyClick)
			document.removeEventListener('mousedown', mouseClick)
		}

		return () => {
			document.removeEventListener('keydown', keyClick)
			document.removeEventListener('mousedown', mouseClick)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open, results])

	return (
		<>
			<SearchIcon />
			<input
				className="search-input"
				type="text"
				aria-label="Search"
				role="combobox"
				aria-expanded={open}
				aria-controls="owned_listbox"
				autoComplete="off"
				spellCheck="false"
				aria-autocomplete="list"
				name="q"
				placeholder="Company or stock symbol..."
				ref={inputRef}
				value={query}
				onChange={e => setQuery(e.target.value)}
				onMouseEnter={() => {
					!fetched && fetchIndex()
				}}
				onClick={() => {
					!fetched && fetchIndex()
				}}
				onFocus={() => {
					setOpen(true)
					!fetched && fetchIndex()
				}}
			/>
			{query && query.length > 0 && (
				<div className="absolute right-[7px] xs:right-[10px]">
					<span
						aria-label="Clear"
						title="Clear"
						tabIndex={0}
						onClick={clearInput}
						onKeyPress={e => {
							if (e.key === 'Enter') {
								clearInput(e)
							}
						}}
					>
						<CloseIcon classes="h-4 w-4 xs:h-5 xs:w-5 text-gray-600 hover:text-blue-500" />
					</span>
				</div>
			)}
			<div className={`dropd ${open ? 'active' : 'inactive'}`}>
				{open && !error && (
					<div className="results-wrap">
						{!loading && query.length === 0 && (
							<h4 className="py-1.5 px-2 text-lg font-semibold sm:px-3">
								Trending
							</h4>
						)}
						{results.length ? (
							<ul role="listbox" id="owned_listbox">
								{results.map((item, index) => (
									<SingleResult
										key={index}
										index={index}
										result={item}
										setOpen={setOpen}
									/>
								))}
							</ul>
						) : null}
						<FullTextSearch
							loading={loading || filtering}
							results={results}
							query={query}
						/>
					</div>
				)}
			</div>
		</>
	)
}
