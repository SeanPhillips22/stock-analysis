import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { GoogleTagManager } from 'components/App/GoogleTagManager'
import { ProgressBar } from 'components/App/ProgressBar'
import PlausibleProvider from 'next-plausible'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<PlausibleProvider domain="stockanalysis.com" trackOutboundLinks={true}>
				<GoogleTagManager />
				<ProgressBar />
				<QueryClientProvider client={queryClient}>
					<Component {...pageProps} />
				</QueryClientProvider>
				<Toaster
					position="top-center"
					toastOptions={{ duration: 5000 }}
					containerStyle={{
						top: 70
					}}
				/>
			</PlausibleProvider>
		</>
	)
}
