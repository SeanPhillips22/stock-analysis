import { supabase } from './supabase'
import router from 'next/router'

export async function signOut() {
	await supabase.auth.signOut()
	router.reload()
}
