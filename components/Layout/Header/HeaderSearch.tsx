import { SiteSearch } from 'components/Search/SiteSearch'

export const HeaderSearch = () => {
	return (
		<div className="hd-search">
			<form action="/search/" method="get" role="search">
				<div className="flex items-center relative">
					<SiteSearch />
				</div>
			</form>
		</div>
	)
}
