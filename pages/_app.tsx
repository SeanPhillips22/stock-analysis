import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { GoogleTagManager } from 'components/App/GoogleTagManager'
import { ProgressBar } from 'components/App/ProgressBar'
import PlausibleProvider from 'next-plausible'

const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<PlausibleProvider domain="stockanalysis.com">
			<GoogleTagManager />
			<ProgressBar />
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
			</QueryClientProvider>
		</PlausibleProvider>
	)
}
