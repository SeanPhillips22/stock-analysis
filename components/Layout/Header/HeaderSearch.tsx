import { SiteSearch } from 'components/Search/SiteSearch'

export const HeaderSearch = () => {
	return (
		<div className="hd-search">
			<form action="/search/" method="get" role="search">
				<div className="flex items-center relative">
					<SiteSearch classes="border border-gray-200 placeholder-gray-700 text-sm xs:text-base py-1.5 md:py-2 pl-7 tiny:pl-8 xs:pl-10 flex-grow focus:ring-0 focus:border-gray-200 focus:outline-none hover:bg-white focus:bg-white focus:shadow-lg rounded-sm bg-gray-50 focus:bg-white w-full" />
				</div>
			</form>
		</div>
	)
}
