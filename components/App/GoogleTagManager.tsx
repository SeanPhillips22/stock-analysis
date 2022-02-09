import Script from 'next/script'

/**
 * Load the Google Tag Manager script
 */
export function GoogleTagManager() {
	const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

	// If GTM_ID is not defined as an environment variable,
	// then don't render the script tag so that it doesn't load
	// in localhost or preview deployments
	if (!GTM_ID) return null

	return (
		<Script
			id="google-tag-manager"
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{
				__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`
			}}
		/>
	)
}
