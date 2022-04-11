type Event = 'SIGNED_IN' | 'SIGNED_OUT'

/**
 * Set a supabase cookie in order to use server-rendered features
 */
export async function setCookie(event: Event, session: any) {
	// set a cookie in order to use server-side rendered features
	await fetch('/api/auth/', {
		method: 'POST',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		credentials: 'same-origin',
		body: JSON.stringify({ event, session })
	})
}
