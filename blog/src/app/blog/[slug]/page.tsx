import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/utils/mdx";
import type { Metadata } from "next";
import MDXContent from "@/components/MDXContent";
import Link from "next/link";
import { generateMetadata as generateSiteMetadata } from "@/app/metadata";

function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export async function generateStaticParams() {
	const slugs = await getPostSlugs();
	return slugs.map((slug) => ({ slug }));
}

interface Props {
	params: {
		slug: string;
	};
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = params;
	const { meta } = await getPostBySlug(slug);

	return generateSiteMetadata({
		title: meta.title,
		description: meta.summary,
		path: `/blog/${slug}`,
	});
}

export default async function BlogPostPage({
	params,
}: { params: { slug: string } }) {
	try {
		const { slug } = await params;
		const { meta, content } = await getPostBySlug(slug);
		return (
			<article className="prose max-w-2xl mx-auto">
				<h1>{meta.title}</h1>
				<p className="text-gray-500 text-sm mb-4">{formatDate(meta.date)}</p>
				{meta.tags && meta.tags.length > 0 && (
					<div className="flex gap-2 mb-6">
						{meta.tags.map((tag) => (
							<Link
								key={tag}
								href={`/blog/tag/${tag}`}
								className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
							>
								#{tag}
							</Link>
						))}
					</div>
				)}
				<MDXContent source={content} />
			</article>
		);
	} catch {
		notFound();
	}
}
