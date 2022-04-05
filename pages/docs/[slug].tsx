import { GetStaticProps, GetStaticPaths } from 'next'
import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import matter from 'gray-matter'
import { ArticleLayout } from 'components/Layout/ArticleLayout'
import { SEO } from 'components/SEO'
import { CustomLink, External } from 'components/CustomLink'
import { Information } from 'components/Alerts/Information'

const components = {
	a: CustomLink,
	External,
	Information
}

interface Props {
	content: {
		compiledSource: string
	}
	meta: {
		title: string
		heading: string
		description: string
		image: string
		date: string
	}
	slug: string
}

export default function Page({ content, meta, slug }: Props) {
	return (
		<>
			<SEO
				title={meta.title}
				description={meta.description}
				canonical={`/docs/${slug}/`}
				image={meta.image}
				type="article"
			/>
			<ArticleLayout meta={meta} url={`/term/${slug}/`}>
				<div>
					<MDXRemote {...content} components={components} />
				</div>
			</ArticleLayout>
		</>
	)
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const slug = params ? params.slug : ''
	const filePath = path.join(process.cwd(), 'content/docs', `${slug}.mdx`)
	const source = fs.readFileSync(filePath)

	const { content, data } = matter(source)

	const mdxSource = await serialize(content, {
		scope: data
	})

	return {
		props: {
			content: mdxSource,
			meta: data,
			slug: slug
		}
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = [{ params: { slug: 'premarket-movers' } }]

	return {
		paths,
		fallback: false
	}
}
