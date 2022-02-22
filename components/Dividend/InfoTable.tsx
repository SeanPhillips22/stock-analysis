import { InfoTableType } from 'types/Dividend'

export const InfoTable = ({ data }: { data: InfoTableType }) => {
	return (
		<div className="mt-6 grid grid-cols-2 gap-3 px-1 text-base bp:mt-7 bp:text-lg sm:grid-cols-3 sm:gap-6 sm:px-4 sm:text-xl">
			<div>
				Dividend Yield
				<div className="mt-0.5 text-lg font-semibold bp:text-xl sm:mt-1.5 sm:text-2xl">
					{data.yield}
				</div>
			</div>
			<div>
				Annual Dividend
				<div className="mt-0.5 text-lg font-semibold bp:text-xl sm:mt-1.5 sm:text-2xl">
					{data.annual}
				</div>
			</div>
			<div>
				Ex-Dividend Date
				<div className="mt-0.5 text-lg font-semibold bp:text-xl sm:mt-1.5 sm:text-2xl">
					{data.exdiv}
				</div>
			</div>
			<div>
				Payout Frequency
				<div className="mt-0.5 text-lg font-semibold bp:text-xl sm:mt-1.5 sm:text-2xl">
					{data.frequency}
				</div>
			</div>
			<div>
				Payout Ratio
				<div className="mt-0.5 text-lg font-semibold bp:text-xl sm:mt-1.5 sm:text-2xl">
					{data.payoutRatio}
				</div>
			</div>
			<div>
				Dividend Growth<span className="hidden bp:visible"> (1Y)</span>
				<div className="mt-0.5 text-lg font-semibold bp:text-xl sm:mt-1.5 sm:text-2xl">
					{data.growth}
				</div>
			</div>
		</div>
	)
}
