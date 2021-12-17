type Props = {
	email?: string
	signOut: () => void
}

export function LogOut({ email, signOut }: Props) {
	return (
		<>
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h1 className="mt-2 xs:mt-4 sm:mt-6 text-center text-2xl xs:text-3xl font-bold text-gray-900">
					You are logged in
				</h1>
				{email && (
					<p className="mt-2 text-center font-medium text-smaller text-gray-600">
						Logged in as {email}
					</p>
				)}
			</div>

			<div className="mt-6 xs:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-6 xs:py-8 px-4 sm:rounded-lg sm:px-10 border border-gray-300">
					<div>
						<button
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							onClick={signOut}
						>
							Log Out
						</button>
					</div>
				</div>
			</div>
		</>
	)
}
