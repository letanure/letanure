import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { generateMetadata as generateSiteMetadata } from "@/lib/metadata";
import { getTranslation } from "@/i18n";
import { generateBlogPostSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";
import { dateFormat } from "@/lib/utils";
import { ItemSummary } from "@/components/ui/ItemSummary";

const t = getTranslation();

interface Props {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	try {
		const { slug } = await params;
		const post = await import(`@/content/mdx/${slug}.mdx`);
		return generateSiteMetadata({
			title: post.metadata.title,
			description: post.metadata.summary,
			path: `/blog/${slug}`,
		});
	} catch (error) {
		console.error("Error generating metadata:", error);
		return generateSiteMetadata({
			title: t.blog.title,
			description: t.blog.description,
			path: "/blog",
		});
	}
}

// export async function generateStaticParams() {
// 	const posts = await import.meta.glob<{
// 		metadata: { title: string; date: string; summary: string; tags: string[] };
// 	}>("@/content/mdx/*.mdx");
// 	return Object.keys(posts).map((path) => ({
// 		slug: path.replace(/^.*[\\\/]/, "").replace(/\.mdx$/, ""),
// 	}));
// }

export default async function BlogPostPage({ params }: Props) {
	const { slug } = await params;

	const post = await import(`../../../../../content/posts/${slug}.mdx`);
	const { metadata, default: Content } = post;

	if (!post) {
		notFound();
	}
	try {
		const postUrl = `${siteConfig.url}/blog/${slug}`;
		const schema = generateBlogPostSchema({
			title: metadata.title,
			description: metadata.summary,
			date: metadata.date,
			url: postUrl,
			tags: metadata.tags,
		});

		return (
			<>
				<script
					type="application/ld+json"
					suppressHydrationWarning
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
				/>
				<article
					className="prose max-w-2xl mx-auto"
					aria-labelledby="post-title"
				>
					<ItemSummary
						as="header"
						slug={slug}
						title={metadata.title}
						date={dateFormat(metadata.date)}
						tags={metadata.tags}
						hasBorder={false}
						isLink={false}
					/>

					<div
						className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
						aria-label={t.a11y.postContent}
					>
						<Content />
					</div>
				</article>
			</>
		);
	} catch (error) {
		console.error("Error loading blog post:", error);
		notFound();
	}
}
