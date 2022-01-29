import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { navState } from 'state/navState'
import { splitUrl } from 'functions/helpers/splitUrl'

export const useNavState = () => {
	const router = useRouter()
	const path = navState(state => state.path)
	const setPath = navState(state => state.setPath)
	const route = navState(state => state.route)
	const setRoute = navState(state => state.setRoute)
	const views = navState(state => state.views)
	const setViews = navState(state => state.setViews)

	useEffect(() => {
		const url = router.asPath
		const { one, two, three, four, five } = splitUrl(url)

		setPath({
			one,
			two,
			three,
			four,
			five
		})

		setRoute(url)
		setViews(views + 1)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.asPath])

	return { path, route, views }
}
