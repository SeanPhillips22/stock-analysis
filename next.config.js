module.exports = {
	trailingSlash: true,
	experimental: {
		scrollRestoration: true
	},
	async redirects() {
		return [
			{
				source: '/ipos/2021-list/',
				destination: '/ipos/2021/',
				permanent: true
			},
			{
				source: '/ipos/2020-list/',
				destination: '/ipos/2020/',
				permanent: true
			},
			{
				source: '/ipos/2019-list/',
				destination: '/ipos/2019/',
				permanent: true
			},
			{
				source: '/ipos/2020-list/%20',
				destination: '/ipos/2020/',
				permanent: true
			},
			{
				source: '/stocks/wp-login.php',
				destination: '/stocks/',
				permanent: true
			},
			{
				source: '/etf/wp-login.php',
				destination: '/etf/',
				permanent: true
			},
			{
				source: '/stock-screener/',
				destination: '/screener/stock/',
				permanent: true
			},
			{
				source: '/ipos/screener/',
				destination: '/screener/ipo/',
				permanent: true
			},
			{
				source: '/screener/',
				destination: '/screener/stock/',
				permanent: true
			},
			{
				source: '/author/krisgunnars/',
				destination: '/about/',
				permanent: true
			}
		]
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'sameorigin'
					}
				]
			},
			{
				source: '/:all*(ico|jpg|png)',
				locale: false,
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=86400'
					}
				]
			}
		]
	}
}
