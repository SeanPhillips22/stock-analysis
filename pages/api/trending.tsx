import type { NextApiRequest, NextApiResponse } from 'next'
const { google } = require('googleapis')
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const googleAuth = new google.auth.GoogleAuth({
		credentials: {
			client_email:
				'stockanalysis@aqueous-botany-306400.iam.gserviceaccount.com',
			private_key:
				'-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCJSUUso2izng48\naOIt12ZY/qjWTgpNLH5nFyqFD4C3eu/x5ef+YCS8PEY2SzOBd6ZKJZXhKsTXrRfk\ntEOSaclwms7yCfd1+ol9JqH5cfQjp7qgs6LYDLT7dADsHYwa/fZiX2VZCQaFGhx5\nC3+fdtbWrIolyIQeI4X3et9+NLyua33n5z6yQIJ0HjNPEz9mfpljwDoc1H3twV1i\nSzdBnqchDDy9rTmVvO1MThI8raJTF4rol5Nea9862QCaRP1YY2qM9b8zQykXwXMy\nC2b99IMxcI44YEqEIP/J3OtwqOOOznk1lXxWJM0iMAXPPUCYnRed4D7WMYUak4bE\nlaQhsKvpAgMBAAECggEAAcv7c4rc+TLZoVlHEo4F6SbGG23wjROGwP8o3451IxGh\nF9OoPmhQOsV4Lsg7r5dbDg/hXw3R/zek/ymL09v+FrLz/+949WqWx5RMnOjsptXQ\nZ7+KI1VBPiRFydFWLtlBkwaIG0r2sqHFmyD3JeVmiO8/rKBr+EADRhqt16dFi+vX\n1PM3vQaSIljVJnidoGeM/40gM4GCGEz1/jrGgThR5iNrfP7Gca6zSlATgJo0/8qN\n/m0tTIFxD968a99ICfoHvHPmBsHs0aEpZI1imjRGY6HAbtM0O54A2b/pwJ7LuoNZ\nvWYRAJdvwkJyQ0ulUCJ0JsCZftay65AVjDmlKuZJYQKBgQC9AYCgaDDHFYs2O4SB\nLfvSb/qnMwBr0n9J+Hpa3Fa4S2+W2GF0qkfTpq3//wWQKviENxlD2E9RJbdTEulR\nka5x7wLVlPusUb+G+IZ/10/zOnr5imoeAoWuzgz8Obdhkt0fAEuqeMHv894W7EMr\nzU8NBcoOc2KB/Gzt2rQDZKKsuQKBgQC58rKE2RQWH9V4ZaDFOnj1CHo2k6lcjbL0\nF+JmW6IuHpBMiJ8hhzU9KML4mFMOM+TkOjWk5vaOb+wXvxvT/ZofDFZN7WJmcphW\naTBk2Tr0uJ1eMEVlfW609xuEgcRDJEkF0fXopkPLcF3dWtV88ix0VcE0W+LbWFkn\nCQMpV9FAsQKBgGHQrj3VzjCqIKLPiJLGNoZA96qiRXyHsuKYWtI9KBA20ihyEXWs\nToHlyDUtSTbEVlsunL+06c+oQkkXB3L0fyBtvrzEXr9ei02RvyHYT4MkZ9JPZP3k\n9kRyVNwQDqzLse5CW+Z8mnnRbsXUPiskFN47eceixX9aIRGz1ufOpDXZAoGBAJS/\niwMuzByutourcKKVlfEeKPXDxbWePMt618deAiy2kmRG3lVp3bLhCqbm43n3FWFl\nF0ik4hMrgUe1v0MkGchAjEGmZhLiFO77EpV6GOlvTaPtJXZ8krT8/+xOCnxTaH7Z\naMgFSTJS3yOV6DYdXGZruzRxVNZ2pErPsNG/yErhAoGAdfVwZ80dA/DmyJ0Jxga+\n5zpLDBw5bd922hpFdPw0QWxU1dlczmV3UdjAlbTQPj3bulesIOIZSS4etivhjumb\nL/BafNI9o9d+cYawaN+EFRguiP+QgNQJJOJHt5yTglp0zx1whi2FbeMXj9Y65YYw\nU8qJaMZGJKccxxfOaRXmQZA=\n-----END PRIVATE KEY-----\n',
		},
		scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
	})
	const analytics = google.analytics({
		version: 'v3',
		auth: googleAuth,
	})

	const response = await analytics.data.ga.get({
		'end-date': 'today',
		dimensions: 'ga:pagePath',
		ids: 'ga:189000791',
		sort: '-ga:pageviews',
		metrics: 'ga:pageviews',
		filters:
			'ga:pagePath=@/stocks/;ga:pagePath!@financials;ga:pagePath!@statistics;ga:pagePath!@chart;ga:pagePath!@company;ga:pagePath!@dividend',
		'start-date': 'today',
		'max-results': '200',
	})
}
