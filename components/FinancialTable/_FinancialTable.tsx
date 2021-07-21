/* eslint-disable react/display-name */
import {
	FinancialsType,
	FinancialsMapType,
	FinancialReport,
} from 'types/Financials';
import { Info } from 'types/Info';
import { useState, forwardRef } from 'react';
import { financialsState } from 'state/financialsState';
import { authState } from 'state/authState';
import {
	formatNumber,
	formatYear,
	redOrGreen,
	getPeriodLabel,
	getPeriodTooltip,
} from './FinancialTable.functions';
import { HoverChartIcon } from 'components/Icons/HoverChart';
import styles from './FinancialTable.module.css';
import { TableTitle } from './TableTitle';
import { TableControls } from './TableControls';
import Paywall from './Paywall';
import dynamic from 'next/dynamic';

import { Tooltip } from './Tooltip';
import { TooltipChart } from './TooltipChart';

const HoverChart = dynamic(() => import('./HoverChart'), { ssr: false });

interface Props {
	statement: string;
	financials: FinancialsType;
	info: Info;
	map: FinancialsMapType[];
}

export const FinancialTable = ({ statement, financials, info, map }: Props) => {
	const range = financialsState((state) => state.range);
	const divider = financialsState((state) => state.divider);
	const leftRight = financialsState((state) => state.leftRight);
	const isPro = authState((state) => state.isPro);
	const [hover, setHover] = useState(false);

	if (!financials || Object.keys(financials).length === 0) {
		return <span>Loading...</span>;
	}

	const data =
		statement === 'ratios' && range === 'quarterly'
			? financials.trailing
			: financials[range as keyof FinancialsType]; // The data for the selected financial statement

	const paywall = range === 'annual' ? 15 : 40;
	const fullcount = data && data.datekey ? data.datekey.length : 0;

	let showcount = !isPro && fullcount > paywall ? paywall : fullcount; // How many data columns

	// Remove initial empty columns in ratios statement
	if (statement === 'ratios') {
		const marketCapData = data.marketcap;
		const marketCapValid = marketCapData.filter(
			(item) => item != null
		).length;
		if (marketCapValid < showcount) {
			showcount = marketCapValid;
		}
	}

	// If count is empty, show message
	if (showcount === 0) {
		return (
			<>
				<div className="px-4 lg:px-6 mx-auto">
					<TableTitle
						statement={statement}
						currency={info.currency}
						fiscalYear={info.fiscalYear}
					/>
					<span className="text-xl">
						No {range} {statement.replace(/_/g, ' ')} data found for this
						stock.
					</span>
				</div>
			</>
		);
	}

	const DATA_MAP = map;

	const headerRow = () => {
		let headerdata = data.datekey;
		if (fullcount > showcount) {
			headerdata = headerdata.slice(0, showcount);
		}
		if (leftRight) {
			headerdata = headerdata.reverse();
		}

		return headerdata.map((cell, index) => {
			return (
				<th key={index} title={cell}>
					{range === 'annual' ? formatYear(cell) : cell}
				</th>
			);
		});
	};

	interface RowTitleProps {
		title: string;
		indent?: boolean;
	}

	const RowTitle = forwardRef<HTMLSpanElement, RowTitleProps>((props, ref) => {
		const { title, indent } = props;
		const margin = indent ? ' ml-3' : '';

		return (
			<span ref={ref} className={'cursor-help' + margin}>
				{title}
			</span>
		);
	});

	const IndicatorTooltip = ({ row }: { row: FinancialsMapType }) => {
		return (
			<div>
				<h4 className="text-xl font-semibold mb-2">{row.title}</h4>
				<div className="border-t border-gray-300 pt-2">{row.tooltip}</div>
				{row.formula && (
					<div className="text-sm border-t border-gray-300 mt-3 pt-2">
						{row.formula}
					</div>
				)}
			</div>
		);
	};

	const ChartIcon = forwardRef<HTMLDivElement>((props, ref) => {
		return (
			<div ref={ref} className={styles.iconcelldiv} tabIndex={0}>
				<HoverChartIcon />
			</div>
		);
	});

	const BodyRow = ({ row }: { row: FinancialsMapType }) => {
		const id = row.id;
		const dataid = row.data || row.id;
		const format = row.format || 'standard';
		let offset = range === 'annual' ? 1 : 4;
		let total = 0;

		let rowdata = data[dataid as keyof FinancialReport];
		let revenuedata = data.revenue;

		if (fullcount > showcount) {
			if (statement === 'income_statement') {
				revenuedata = revenuedata.slice(0, showcount);
			}
			rowdata = rowdata.slice(0, showcount);
		}

		if (leftRight) {
			offset = -offset;
			if (statement === 'income_statement') {
				revenuedata = revenuedata.reverse();
			}
			rowdata = rowdata.reverse();
		}

		const dataRows = rowdata.map((cell, index) => {
			if (typeof cell === 'number') {
				const prev = format === 'growth' ? rowdata[index + offset] : null;
				const rev = format === 'margin' ? revenuedata[index] : null;

				const titleTag = formatNumber({
					type: row.format || 'standard',
					current: cell,
					previous: prev,
					revenue: rev,
					divider: 'raw',
				});

				const cellContent = formatNumber({
					type: row.format || 'standard',
					current: cell,
					previous: prev,
					revenue: rev,
					divider,
				});

				const cellClass = () => {
					if (format === 'growth' && cellContent) {
						return redOrGreen(cellContent, id);
					}
					return '';
				};

				if (cell != 0 && cellContent != '-') {
					total++;
				}

				return (
					<td key={index} title={titleTag} className={cellClass()}>
						{cellContent}
					</td>
				);
			}
			return null;
		});

		const getRowStyles = () => {
			const styles = [];
			if (row.format === 'growth' || row.border) {
				styles.push(
					'border-b-2 border-gray-300 text-[0.85rem] sm:text-[0.95rem]'
				);
			}
			if (row.bold) {
				styles.push('font-semibold text-gray-800');
			}
			if (row.extrabold) {
				styles.push('font-bold text-gray-700');
			}

			return styles.join(' ');
		};

		if (total == 0) {
			return null;
		}
		return (
			<>
				<tr className={getRowStyles()}>
					<td
						className="flex flex-row justify-between items-center"
						onClick={() => !hover && setHover(true)}
						onMouseEnter={() => !hover && setHover(true)}
					>
						<Tooltip
							content={<IndicatorTooltip row={row} />}
							theme="light"
							delay={100}
							className={styles.bigTooltipText}
						>
							<RowTitle
								title={row.title}
								indent={row.format === 'growth' || row.indent}
							/>
						</Tooltip>
						<TooltipChart
							render={(attrs) => (
								<div
									className="bg-white border border-gray-200 p-2 md:py-2 md:px-3 h-[40vh] w-[95vw] md:h-[330px] md:w-[600px] z-40"
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
										/>
									)}
								</div>
							)}
							delay={100}
							interactive={true}
							offset={[150, -1]}
							popperOptions={{
								modifiers: [{ name: 'flip', enabled: false }],
							}}
							trigger="mouseenter focus click"
							zIndex={30}
						>
							<ChartIcon />
						</TooltipChart>
					</td>
					{dataRows}
				</tr>
			</>
		);
	};

	const paywalled = showcount < fullcount ? 'true' : false;

	return (
		<div>
			<div className="flex flex-row justify-between items-end">
				<TableTitle
					statement={statement}
					currency={info.currency}
					fiscalYear={info.fiscalYear}
				/>
				<TableControls
					map={map}
					financials={financials}
					statement={statement}
					symbol={info.symbol}
				/>
			</div>
			<div
				className={
					'overflow-x-auto border border-gray-300' +
					(paywalled ? ' flex flex-row' : '')
				}
			>
				{paywalled && <div className="flex flex-row"></div>}
				<table className={[styles.table, styles.table_financial].join(' ')}>
					<thead>
						<tr className="border-b-2 border-gray-300">
							<th className="flex flex-row justify-between items-center">
								<Tooltip
									content={getPeriodTooltip(range)}
									theme="light"
									delay={100}
									className={styles.bigTooltipText}
								>
									<RowTitle
										title={getPeriodLabel(range)}
										indent={false}
									/>
								</Tooltip>
							</th>
							{headerRow()}
						</tr>
					</thead>
					<tbody>
						{DATA_MAP.map((row, index) => {
							return <BodyRow row={row} key={index} />;
						})}
					</tbody>
				</table>
				{paywalled && (
					<Paywall
						range={range}
						fullcount={fullcount}
						showcount={showcount}
					/>
				)}
			</div>
		</div>
	);
};