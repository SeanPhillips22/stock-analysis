import { ReactNode } from 'react';
import { NewsletterWidget } from 'components/Layout/Sidebar/Newsletter';
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs';
import { Sidebar1 } from 'components/Ads/Snigel/Sidebar1';

interface Props {
	heading: string;
	children: ReactNode;
	url: string;
}

export const LayoutSidebar = ({ heading, children, url }: Props) => {
	return (
		<div className="contain">
			<main id="main" className="w-full py-5 xs:py-6">
				<Breadcrumbs url={url} />
				<h1 className="hh1 border-b-[3px] border-blue-brand_sharp pb-3 mb-0">
					{heading}
				</h1>

				<div className="lg:grid lg:grid-cols-sidebar gap-10 mt-3 sm:mt-4 lg:mt-5">
					<div className="">{children}</div>
					<aside className="py-8 lg:py-0">
						<Sidebar1 />
						<NewsletterWidget />
					</aside>
				</div>
			</main>
		</div>
	);
};
