import { NextApiRequest } from 'next'
import { verifyPaddleWebhook } from 'verify-paddle-webhook'

const PUBLIC_KEY = `
-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAx0Wnd9QwVDS6/VtcocRB
BnosfNl8AV5WzjXs4Ne9Un8E4mEyaFhGt4cfcnPCEet1w44QcPwsucguVB4/V2hL
cY9Jy9Q0bYt00LsZIBA2tp4dak8nchuiNt7o8c96Nr7YpRqt+sgGlsoAU0hvp0wb
AgeF8Q39dN6mNh8P6J/cQ7vEqGCnSEO72Qky+VKjGCsLgZe8jC0hM+pAC6aPwJzB
g8Lc2Z0wCkV8VOHYywNTOk00cJDRcPcIaXchaWBWP4XYglBM27yBc8afKb4aIVrP
UlQolXKASysjjgGndOq/SVTXtasfIcK1AhJFsmsr8eEZvBgORYDeuFY6cDCseowe
ZqgI1nPoYyyMnXLiEA8z7J+wd6qbylSOTbc7ScDzTw9IegMKvXcY9r5YYMjxceHz
x5hUYUoH1UNmeQbP7wd7BFEi1Qxt2dFyGNQfMY+KynrwB/rzMp+8kSpX2YLQBERM
ezOSk7fdtc8jPC76CC2n0Ed8eI4xazRoVfjZYwKYnPtA65NS0/Z1jypceOAq63Hd
24s1qoV6lgssUjwVKFjhs5G7QVf1ZxmN8dKkGE3Fu5UwEgbjZ0za2O557sq+P43S
MEN4CS+/3fQrGbJayz970zbQDZAhu1tTxbjpHHiD5d+XPLQoTMhaxbI8mRk6FGGU
gi0mjSwdgb75x7akc9HMEJ0CAwEAAQ==
-----END PUBLIC KEY-----`

/**
 * Verify the signature from Paddle to confirm that it was truly sent from Paddle.
 * @param req The request object.
 * @returns true or false
 */
export function verifyWebhook(req: NextApiRequest) {
	return verifyPaddleWebhook(PUBLIC_KEY, req.body)
}
