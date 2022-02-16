import { SpinnerIcon } from 'components/Icons/Spinner'
import { Success } from 'components/Alerts/Success'

type Props = {
	fn: () => Promise<void>
	tag: string
	loading: boolean
	end: boolean
}

export function ButtonMore({ fn, tag, loading, end }: Props) {
	if (end) {
		return (
			<div className="mt-4">
				<Success message="You have reached the end of the news feed!" />
			</div>
		)
	}

	return (
		<button
			className="mx-auto mt-5 flex w-[90%] items-center justify-center rounded-md border border-transparent bg-blue-brand_light px-6 py-3 text-lg font-medium text-white shadow-sm hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-full lg:mt-6"
			onClick={fn}
			disabled={loading}
			id={`tag-feat-news-load-${tag}`}
		>
			{loading ? (
				<>
					<SpinnerIcon /> Loading...
				</>
			) : (
				'Load More News'
			)}
		</button>
	)
}
