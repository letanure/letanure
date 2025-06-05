import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/utils/mdx";
import type { Metadata } from "next";
import MDXContent from "@/components/MDXContent";

export async function generateStaticParams() {
	const slugs = await getPostSlugs();
	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: { params: { slug: string } }): Promise<Metadata> {
	const { slug } = await params;
	const { meta } = await getPostBySlug(slug);
	return {
		title: meta.title,
		description: meta.summary,
	};
}

export default async function BlogPostPage({
	params,
}: { params: { slug: string } }) {
	try {
		const { slug } = await params;
		const { meta, content } = await getPostBySlug(slug);
		return (
			<article className="prose mx-auto">
				<h1>{meta.title}</h1>
				<p className="text-gray-500 text-sm mb-4">{meta.date}</p>
				<MDXContent source={content} />
				aaa
			</article>
		);
	} catch {
		notFound();
	}
}
