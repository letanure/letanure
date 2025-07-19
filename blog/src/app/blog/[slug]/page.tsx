import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getTranslation } from "@/i18n";
import { generateBlogPostSchema } from "@/lib/schema";
import { generateMetadata as generateSiteMetadata } from "@/lib/metadata";
import { siteConfig } from "@/siteConfig";
import { ItemSummary } from "@/components/ui/ItemSummary";
import { Title } from "@/components/ui/Title";
import { TagList } from "@/components/ui/TagList";
import PostsList from "@/components/PostsList";
import { postMetadataGet } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

const t = getTranslation();

interface Props {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	try {
		const { slug } = await params;
		const post = postMetadataGet(slug);
		return generateSiteMetadata({
			title: post.title,
			description: post.summary,
			path: `/blog/${slug}`,
			image: `${siteConfig.url}/blog/${slug}/opengraph-image`,
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

export async function generateStaticParams() {
	const fs = await import('node:fs');
	const path = await import('node:path');
	const postsDirectory = path.join(process.cwd(), 'content', 'posts');
	const filenames = fs.readdirSync(postsDirectory);
	
	return filenames
		.filter((name) => name.endsWith('.mdx'))
		.map((name) => ({
			slug: name.replace(/\.mdx$/, ''),
		}));
}

export default async function BlogPostPage({ params }: Props) {
	const { slug } = await params;

	try {
		const metadata = postMetadataGet(slug);
		const post = await import(`../../../../content/posts/${slug}.mdx`);
		const { default: Content } = post;

		if (!Content || !metadata) {
			console.error("Post or metadata not found for slug:", slug);
			notFound();
		}

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

				<article className="py-8 sm:py-12">
					<header className="mb-12">
						<h1 className="text-4xl font-bold text-[#292929] dark:text-[#E6E6E6] mb-4 leading-tight">
							{metadata.title}
						</h1>
						<div className="flex items-center gap-4 text-sm text-[#757575] dark:text-[#A8A8A8] mb-6">
							<time>{formatDate(metadata.date)}</time>
						</div>
						<div className="flex flex-wrap gap-2">
							{metadata.tags.map((tag) => (
								<a
									key={tag}
									href={`/blog/tag/${tag}`}
									className="text-sm text-[#757575] dark:text-[#A8A8A8] hover:text-[#292929] dark:hover:text-[#E6E6E6] transition-colors"
								>
									#{tag}
								</a>
							))}
						</div>
					</header>
					
					<div className="prose max-w-none" aria-label={t.a11y.postContent}>
						<Content />
					</div>
					
					<footer className="mt-16 pt-8 border-t border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.12)]">
						<h3 className="text-2xl font-semibold text-[#292929] dark:text-[#E6E6E6] mb-8">
							More posts
						</h3>
						<PostsList limit={3} showTags={false} currentSlug={slug} />
					</footer>
				</article>
			</>
		);
	} catch (error) {
		console.error("Error loading blog post:", error);
		console.error("Slug:", slug);
		notFound();
	}
}