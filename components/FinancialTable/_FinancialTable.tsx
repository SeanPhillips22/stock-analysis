/* eslint-disable react/display-name */
import { FinancialsMapType, FinancialReport, Statement } from 'types/Financials'
import { Info } from 'types/Info'
import { useState, useEffect, forwardRef, useMemo } from 'react'
import { financialsState } from 'state/financialsState'
import {
	formatCell,
	formatYear,
	redOrGreen,
	getPeriodLabel,
	getPeriodTooltip,
	sliceData,
	getRowStyles
} from './FinancialTable.functions'
import { HoverChartIcon } from 'components/Icons/HoverChart'
import { TableTitle } from './TableTitle'
import { FinancialsControls } from './Controls/FinancialsControls'
import { PaywallHeaderCell, PaywallBodyCell } from './Paywall'
import dynamic from 'next/dynamic'
import { Tooltip } from './Tooltip'
import { TooltipChart } from './TooltipChart'
import { Unavailable } from 'components/Unavailable'
import { getStockFinancialsFull } from 'functions/apis/callBackEnd'
import { FinancialSource } from './FinancialSource'
import { useAuthState } from 'hooks/useAuthState'

const HoverChart = dynamic(() => import('./HoverChart'), { ssr: false })

interface Props {
	statement: Statement
	financials: FinancialReport
	info: Info
	map: FinancialsMapType[]
	count: number
	range: 'annual' | 'quarterly' | 'trailing'
}

export const FinancialTable = ({ statement, financials, info, map, count, range }: Props) => {
	const divider = financialsState(state => state.divider)
	const reversed = financialsState(state => state.reversed)
	const trailing = financialsState(state => state.trailing)
	const current = financialsState(state => state.current)
	const { isPro } = useAuthState()
	const [hover, setHover] = useState(false)
	const [dataRows, setDataRows] = useState(financials)

	// Check if financial data is paywalled
	const paywall = range === 'annual' ? 11 : 38
	const fullcount = count // The total number of years/quarters available
	const showcount = !isPro && fullcount > paywall ? paywall : fullcount // How many years/quarter to show
	const paywalled = showcount < fullcount ? 'true' : false

	let showTTM =
		range === 'annual' && statement !== 'ratios' && trailing ? true : statement === 'ratios' && current ? true : false

	useEffect(() => {
		setDataRows(financials)
	}, [financials, range])

	// If pro user and data is limited, fetch the full data
	useEffect(() => {
		async function fetchFullFinancials() {
			const res = await getStockFinancialsFull(statement, info.symbol, range)
			if (res && res?.datekey?.length > paywall) {
				setDataRows(res)
			}
		}

		if (isPro && fullcount > paywall) {
			fetchFullFinancials()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [info.symbol, isPro, statement, range])

	let data = useMemo(() => sliceData(dataRows, showcount, reversed), [dataRows, showcount, reversed])

	// If count is empty, show message
	if ((range === 'annual' && showcount < 2) || showcount === 0) {
		return (
			<div>
				<TableTitle info={info} statement={statement} range={range} />
				<Unavailable
					message={`No ${range} ${statement.replace(/-/g, ' ')} data available for this stock.`}
					classes="min-h-[300px] lg:min-h-[500px]"
				/>
			</div>
		)
	}

	const DATA_MAP = map

	if (!data) {
		return <p>Loading...</p>
	}

	const headerRow = () => {
		const headerdata = data.datekey

		return headerdata?.map((cell, index) => {
			if (cell === 'TTM' && !showTTM) return // Do not show trailing if not enabled

			let cellBody =
				range === 'annual'
					? formatYear(cell, statement)
					: statement === 'ratios' && cell === 'TTM'
					? 'Current'
					: cell

			return (
				<th
					key={index}
					title={cell !== 'TTM' ? cell : statement === 'ratios' ? 'Current values' : 'Trailing-Twelve Months'}
				>
					{cellBody}
				</th>
			)
		})
	}

	interface RowTitleProps {
		title: string
		indent?: boolean
	}

	const RowTitle = forwardRef<HTMLSpanElement, RowTitleProps>((props, ref) => {
		const { title, indent } = props
		const margin = indent ? 'ml-3' : ''

		return (
			<span ref={ref} className={margin}>
				{title}
			</span>
		)
	})

	const IndicatorTooltip = ({ row }: { row: FinancialsMapType }) => {
		return (
			<div>
				<h4 className="mb-2 text-xl font-semibold">{row.tooltipTitle || row.title}</h4>
				<div className="border-t border-gray-300 pt-2">{row.tooltip}</div>
				{row.formula && <div className="mt-3 border-t border-gray-300 pt-2 text-sm">{row.formula}</div>}
			</div>
		)
	}

	const ChartIcon = forwardRef<HTMLDivElement>((props, ref) => {
		return (
			<div ref={ref} className="iconcelldiv">
				<HoverChartIcon />
			</div>
		)
	})

	const BodyRow = ({ row }: { row: FinancialsMapType }) => {
		// Exception: If recent IPO and only 6 quarters, use 3 quarter offset to calculate growth
		let offs = 4
		if (row.format === 'growth' && ['quarterly', 'trailing'].includes(range) && showcount === 6) {
			if (data?.datekey?.length === 6) {
				const firstDate = data.datekey[0]
				const compareDate = data.datekey[3]

				if (firstDate.split('-')[1] === compareDate.split('-')[1]) {
					offs = 3
				}
			}
		}

		const id = row.id
		const dataid = row.data || row.id
		const format = row.format || 'standard'
		let offset = range === 'quarterly' || range === 'trailing' ? offs : 1
		let total = 0

		const rowdata = data[dataid as keyof FinancialReport]
		if (!rowdata) {
			return null
		}
		const revenuedata = data.revenue

		if (reversed) {
			offset = -offset
		}

		const dataRows = rowdata.map((cell, index) => {
			let isTTMcolumn = data.datekey[index] === 'TTM' ? true : false
			if (isTTMcolumn && !showTTM) return // Do not show trailing if not enabled

			if (typeof cell === 'number') {
				const prev = format === 'growth' ? rowdata[index + offset] : null
				const rev = format === 'margin' ? revenuedata[index] : null

				const titleTag = formatCell({
					type: row.format || 'standard',
					current: cell,
					previous: prev,
					revenue: rev,
					divider: 1,
					isTTMcolumn
				})

				const cellContent = formatCell({
					type: row.format || 'standard',
					current: cell,
					previous: prev,
					revenue: rev,
					divider,
					isTTMcolumn
				})

				const cellClass = format === 'growth' && cellContent ? redOrGreen(cellContent, id) : undefined

				if (cell != 0 && cellContent != '-') {
					total++
				}

				return (
					<td key={index} className={cellClass}>
						{cellContent !== '-' ? <span title={titleTag}>{cellContent}</span> : '-'}
					</td>
				)
			} else {
				return <td key={index}>-</td>
			}
		})

		if (total == 0) {
			return null
		}
		return (
			<>
				<tr className={getRowStyles(row)}>
					<td
						className="flex flex-row items-center justify-between"
						onTouchStart={() => !hover && setHover(true)}
						onClick={() => !hover && setHover(true)}
						onMouseEnter={() => !hover && setHover(true)}
					>
						<Tooltip
							content={<IndicatorTooltip row={row} />}
							theme="light"
							delay={300}
							className="bigTooltipText"
						>
							<RowTitle title={row.title} indent={row.format === 'growth' || row.indent} />
						</Tooltip>
						<TooltipChart
							render={attrs => (
								<div
									className="z-20 h-[40vh] w-[95vw] border border-gray-200 bg-white p-2 md:h-[330px] md:w-[600px] md:py-2 md:px-3"
									tabIndex={-1}
									{...attrs}
								>
									{hover && (
										<HoverChart
											data={data}
											count={showcount}
											row={row}
											range={range}
											ticker={info.ticker}
											divider={divider}
											reversed={reversed}
											statement={statement}
											showTTM={showTTM}
										/>
									)}
								</div>
							)}
							delay={200}
							interactive={true}
							offset={[150, -1]}
							popperOptions={{
								modifiers: [{ name: 'flip', enabled: false }]
							}}
							trigger="mouseenter focus click"
							zIndex={30}
						>
							<ChartIcon />
						</TooltipChart>
					</td>
					{dataRows}
					{paywalled && !isPro && <PaywallBodyCell range={range} showcount={showcount} fullcount={fullcount} />}
				</tr>
			</>
		)
	}

	return (
		<div>
			<div className="md:flex md:flex-row md:items-end md:justify-between">
				<TableTitle info={info} statement={statement} range={range} />
				<FinancialsControls info={info} statement={statement} range={range} />
			</div>
			<div className={'overflow-x-auto border border-gray-300' + (paywalled ? ' flex flex-row' : '')}>
				<table className="fintbl" id="financial-table">
					<thead>
						<tr className="border-b-2 border-gray-300">
							<th className="flex flex-row items-center justify-between">
								<Tooltip content={getPeriodTooltip(range)} theme="light" delay={100} className="bigTooltipText">
									<RowTitle title={getPeriodLabel(range)} indent={false} />
								</Tooltip>
							</th>
							{headerRow()}
							{paywalled && !isPro && data.datekey && (
								<PaywallHeaderCell
									range={range}
									diff={fullcount - showcount}
									last={data.datekey[data.datekey.length - 1]}
								/>
							)}
						</tr>
					</thead>
					<tbody>
						{DATA_MAP.map((row, index) => {
							return <BodyRow row={row} key={index} />
						})}
					</tbody>
				</table>
			</div>
			<FinancialSource info={info} />
		</div>
	)
}
