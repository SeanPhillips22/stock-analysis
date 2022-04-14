import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from 'auth/supabase/supabase'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	supabase.auth.api.setAuthCookie(req, res)
}
