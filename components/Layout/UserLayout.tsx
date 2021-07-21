import { FC } from 'react';
import { HeaderLogo } from './Header/HeaderLogo';

export const UserLayout: FC = ({ children }) => {
	return (
		<>
			<div className="max-w-[850px] mx-auto px-6 py-20 sm:px-0 space-y-6">
				<main>
					<HeaderLogo className="h-28 w-28 mx-auto mb-8" />
					<div className="max-w-md mx-auto">{children}</div>
				</main>
			</div>
		</>
	);
};