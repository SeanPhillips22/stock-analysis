import { supabase } from './supabase'

export async function signIn(email: string) {
	const { error } = await supabase.auth.signIn({ email })
	return { error }
}
