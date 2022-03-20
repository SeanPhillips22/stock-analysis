type Props = {
	email?: string
	signOut: () => void
}

export function LogOut({ email, signOut }: Props) {
	return (
		<>
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h1 className="mt-2 text-center text-2xl font-bold text-gray-900 xs:mt-4 xs:text-3xl sm:mt-6">
					You are logged in
				</h1>
				{email && <p className="mt-2 text-center text-smaller font-medium text-gray-600">Logged in as {email}</p>}
			</div>

			<div className="mt-6 xs:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="border border-gray-300 bg-white py-6 px-4 xs:py-8 sm:rounded-lg sm:px-10">
					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md border border-transparent bg-blue-brand_light py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
