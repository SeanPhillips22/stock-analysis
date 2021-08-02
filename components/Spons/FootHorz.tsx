import { navState } from 'state/navState';
import { useScript } from 'hooks/useScript';

// Dianomi ad in the footer
export const FooterDianomi = () => {
	const path = navState((state) => state.path);
	useScript('https://www.dianomi.com/js/contextfeed.js');

	if (
		path.one !== 'login' &&
		path.one !== 'pro' &&
		path.one !== 'contact' &&
		path.one !== 'privacy-policy' &&
		path.one !== 'terms-of-use'
	) {
		return (
			<>
				<div className="max-w-[970px] min-h-[250px] mx-auto my-8">
					<div
						className="dianomi_context"
						data-dianomi-context-id="443"
					></div>
				</div>
			</>
		);
	}

	return null;
};
export default FooterDianomi;