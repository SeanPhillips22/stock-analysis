import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import * as React from 'react';
import { IOHLCData } from './iOHLCData';
import { HoverTooltipCustom } from 'components/Chart/HoverTooltipCustom';
import { OHLCTooltipCustom } from 'components/Chart/OHLCTooltipCustom';
import { withSize } from './utils';
import { withDeviceRatio } from './utils';
import { MovingAverageTooltipCustom } from 'components/Chart/MovingAverageTooltipCustom';
import { withOHLCData } from './withOHLCData';
import { ChartCanvas } from './core/ChartCanvas';
import { Chart } from './core/Chart';
import { CandlestickSeries } from './series/CandlestickSeries';
import { LineSeries } from './series/LineSeries';
import { BarSeries } from './series/BarSeries';
import { XAxis, YAxis } from './axes';
import { CrossHairCursor } from './coordinates/CrossHairCursor';
import { EdgeIndicator } from './coordinates/EdgeIndicator';
import { CurrentCoordinate } from './coordinates/CurrentCoordinate';
import { MouseCoordinateY } from './coordinates/MouseCoordinateY';
import { discontinuousTimeScaleProviderBuilder } from './scales/discontinuousTimeScaleProvider';
import { lastVisibleItemBasedZoomAnchor } from './core/zoom';
import { sma } from './indicators/indicator';

interface StockChartProps {
	readonly data: IOHLCData[];
	readonly height: number;
	readonly dateTimeFormat?: string;
	readonly width: number;
	readonly ratio: number;
	readonly type: string;
	readonly period: string;
	readonly time: string;
	readonly stockId: number;
}

interface TooltipOptions {
	yAccessor: (data: any) => number;
	type: string;
	stroke: string;
	windowSize: number | null;
}

class StockChart extends React.Component<StockChartProps> {
	private readonly dateFormat = timeFormat('%Y-%m-%d');
	private readonly margin = { left: 0, right: 62, top: 3, bottom: 24 };
	private readonly pricesDisplayFormat = format('.2f');
	private readonly volumeDisplayFormat = format('.4s');
	private readonly changeDisplayFormat = format('+.2f');
	private readonly percentDisplayFormat = format('+.2%');

	private readonly xScaleProvider =
		discontinuousTimeScaleProviderBuilder().inputDateAccessor(
			(d: IOHLCData) => d.date
		);

	public render() {
		const { data: initialData, height, ratio, width, type } = this.props;

		const disablePan = false;
		const disableZoom = false;

		const candlesAppearance = {
			fill: function fill(d: IOHLCData) {
				return d.close > d.open ? '#26a69a' : '#ef5350';
			},
			clip: true,
			candleStrokeWidth: 0.5,
			widthRatio: 0.8,
		};

		const openCloseColor = (data: IOHLCData) => {
			return data.close > data.open ? '#26a69a' : '#ef5350';
		};

		const priceOrCandleStickColor = (data: IOHLCData) => {
			return type == 'line' ? '#000000' : openCloseColor(data);
		};

		const candleChartExtents = (data: IOHLCData) => {
			return [data.high, data.low, data.ma1, data.ma2];
		};

		const volChartExtents = (data: IOHLCData) => {
			return [data.volume, 0];
		};

		const yEdgeIndicator = (data: IOHLCData) => {
			return data.close;
		};
		const volumeColor = (data: IOHLCData) => {
			return data.close > data.open
				? 'rgba(38, 166, 154, 1)'
				: 'rgba(239, 83, 80, 1)';
		};
		const volumeSeries = (data: IOHLCData) => {
			return data.volume;
		};

		const ma1color = '#2c6288';
		const ma2color = '#c65102';

		const sma50 = sma()
			.id(1)
			.options({ windowSize: 50 })
			.merge((d: any, c: any) => {
				d.ma1 = c;
			})
			.accessor((d: any) => d.ma1);

		const sma200 = sma()
			.id(2)
			.options({ windowSize: 200 })
			.merge((d: any, c: any) => {
				d.ma2 = c;
			})
			.accessor((d: any) => d.ma2);

		const movingAverageTooltipOptions: TooltipOptions[] = [
			{
				yAccessor: (d: IOHLCData) => d.ma1,
				type: 'SMA',
				stroke: ma1color,
				windowSize: sma50.options().windowSize,
			},
			{
				yAccessor: (d: IOHLCData) => d.ma2,
				type: 'SMA',
				stroke: ma2color,
				windowSize: sma200.options().windowSize,
			},
		];

		const calculatedData = sma200(sma50(initialData));

		const { margin, xScaleProvider } = this;

		const { data, xScale, xAccessor, displayXAccessor } =
			xScaleProvider(calculatedData);

		if (type == 'line') {
			movingAverageTooltipOptions.push({
				yAccessor: (d) => d.close,
				type: 'Price',
				stroke: '#000000',
				windowSize: null,
			});
		}

		let max = xAccessor(data[data.length - 1]);
		let min = 0;
		let days = 0;

		const date: any = new Date(data[data.length - 1].date);

		if (this.props.time == '1Y') {
			max = max + 2;
			days = 365;
		} else if (this.props.time == '1M') {
			days = 31;
			max = max + 1;
		} else if (this.props.time == '6M') {
			max = max + 2;
			days = 183;
		} else if (this.props.time == 'YTD') {
			max = max + 2;
			const YTDdate: any = new Date('01/01/' + new Date().getFullYear());
			const difference = date.getTime() - YTDdate.getTime();
			days = difference / (1000 * 3600 * 24);
		} else if (this.props.time == '3Y') {
			max = max + 4;
			days = 1095;
		} else if (this.props.time == '5Y') {
			max = max + 8;
			days = 1825;
		}
		if (this.props.time != 'MAX') {
			date.setDate(date.getDate() - days);

			for (let i = data.length - 1; -1 < i; i--) {
				const dateIndex: Date = new Date(data[i].date);
				if (date > dateIndex) {
					min = xAccessor(data[i + 1]);
					break;
				}
				if (i == 0) {
					min = xAccessor(data[i]);
				}
			}
		} else {
			max = max + 6;
			min = 0;
		}

		const xExtents = [min, max];

		const gridHeight = height - margin.top - margin.bottom;

		const chartHeight = gridHeight;

		return (
			<ChartCanvas
				height={height}
				ratio={ratio}
				width={width}
				margin={margin}
				data={data}
				displayXAccessor={displayXAccessor}
				seriesName="Data"
				disablePan={disablePan}
				disableZoom={disableZoom}
				xScale={xScale}
				xAccessor={xAccessor}
				xExtents={xExtents}
				zoomAnchor={lastVisibleItemBasedZoomAnchor}
			>
				<Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
					<XAxis showTickLabel={true} />
					<YAxis
						showGridLines={true}
						tickFormat={this.pricesDisplayFormat}
					/>
					{type == 'candlestick' ? (
						<CandlestickSeries {...candlesAppearance} />
					) : (
						<>
							<LineSeries
								yAccessor={(d) => d.close}
								strokeStyle={'#000000'}
							/>
							<CurrentCoordinate
								yAccessor={(d) => d.close}
								fillStyle={priceOrCandleStickColor}
							/>
						</>
					)}

					<LineSeries yAccessor={(d) => d.ma1} strokeStyle={ma1color} />
					<CurrentCoordinate
						yAccessor={(d) => d.ma1}
						fillStyle={ma1color}
					/>
					<LineSeries yAccessor={(d) => d.ma2} strokeStyle={ma2color} />
					<CurrentCoordinate
						yAccessor={(d) => d.ma2}
						fillStyle={ma2color}
					/>

					<MouseCoordinateY
						rectWidth={margin.right - 15}
						displayFormat={this.pricesDisplayFormat}
					/>

					<EdgeIndicator
						itemType="last"
						rectWidth={margin.right - 20}
						rectHeight={15}
						fill={ma2color}
						orient="right"
						edgeAt="right"
						fontSize={11}
						lineStroke={ma2color}
						displayFormat={this.pricesDisplayFormat}
						yAccessor={sma200.accessor()}
					/>
					<EdgeIndicator
						itemType="last"
						rectWidth={margin.right - 20}
						rectHeight={15}
						hideLine={true}
						fill={ma1color}
						orient="right"
						edgeAt="right"
						fontSize={11}
						lineStroke={ma1color}
						displayFormat={this.pricesDisplayFormat}
						yAccessor={sma50.accessor()}
					/>
					<EdgeIndicator
						itemType="last"
						rectWidth={margin.right - 15}
						fill={priceOrCandleStickColor}
						lineStroke={priceOrCandleStickColor}
						displayFormat={this.pricesDisplayFormat}
						yAccessor={yEdgeIndicator}
						fontSize={13}
					/>
					<OHLCTooltipCustom origin={[5, 15]} />
					<MovingAverageTooltipCustom
						origin={[8, 24]}
						options={movingAverageTooltipOptions}
					/>
					<HoverTooltipCustom
						yAccessor={sma50.accessor()}
						tooltip={{
							content: ({ currentItem, xAccessor }) => ({
								x: this.dateFormat(xAccessor(currentItem)),
								y: [
									{
										label: 'Open',
										value:
											currentItem.open &&
											this.pricesDisplayFormat(currentItem.open),
									},
									{
										label: 'High',
										value:
											currentItem.high &&
											this.pricesDisplayFormat(currentItem.high),
									},
									{
										label: 'Low',
										value:
											currentItem.low &&
											this.pricesDisplayFormat(currentItem.low),
									},
									{
										label: 'Close',
										value:
											currentItem.close &&
											this.pricesDisplayFormat(currentItem.close),
									},
									{
										label: 'Volume',
										value:
											currentItem.volume &&
											this.volumeDisplayFormat(currentItem.volume),
									},
								],
							}),
						}}
					/>
				</Chart>
				<Chart
					id={4}
					height={100}
					origin={(w, h) => [0, h - 100]}
					yExtents={volChartExtents}
				>
					<BarSeries
						widthRatio={0.5}
						clip={true}
						yAccessor={(d) => d.volume}
						fillStyle={(d) => (d.close > d.open ? '#6BA583' : 'red')}
					/>
					<EdgeIndicator
						itemType="last"
						rectWidth={margin.right - 20}
						rectHeight={15}
						fill={volumeColor}
						orient="right"
						edgeAt="right"
						fontSize={11}
						lineStroke={openCloseColor}
						displayFormat={format('.4s')}
						yAccessor={volumeSeries}
						yAxisPad={0}
					/>
				</Chart>
				<CrossHairCursor />
			</ChartCanvas>
		);
	}
}
export default withOHLCData()(
	withSize({ style: { minHeight: 600 } })(withDeviceRatio()(StockChart))
);