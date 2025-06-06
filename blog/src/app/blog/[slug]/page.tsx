import { notFound } from "next/navigation";
// import type { Metadata } from "next";
import Link from "next/link";
// import { generateMetadata as generateSiteMetadata } from "@/app/metadata";
import { getTranslation } from "@/i18n";
import { generateBlogPostSchema } from "@/utils/schema";
import { siteConfig } from "@/config/site";
import { formatDate, getBlogPosts } from "@/app/blog/utils";

const t = getTranslation();

// function formatDate(dateString: string) {
// 	return new Date(dateString).toLocaleDateString("en-US", {
// 		year: "numeric",
// 		month: "long",
// 		day: "numeric",
// 	});
// }

interface Props {
	params: Promise<{ slug: string }>;
}

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
// 	try {
// 		const { slug } = params;
// 		const post = await import(`@/content/mdx/${slug}.mdx`);
// 		return generateSiteMetadata({
// 			title: post.metadata.title,
// 			description: post.metadata.summary,
// 			path: `/blog/${slug}`,
// 		});
// 	} catch (error) {
// 		console.error("Error generating metadata:", error);
// 		return generateSiteMetadata({
// 			title: t.blog.title,
// 			description: t.blog.description,
// 			path: "/blog",
// 		});
// 	}
// }

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

	const post = await import(`@/content/mdx/${slug}.mdx`);
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
					<header>
						<h1
							id="post-title"
							className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
						>
							{metadata.title}
						</h1>
						<p
							className="text-gray-500 text-sm mb-4"
							aria-label={t.a11y.publicationDate}
						>
							{formatDate(metadata.date)}
						</p>
						{metadata.tags && metadata.tags.length > 0 && (
							<nav className="flex gap-2 mb-6" aria-label={t.a11y.postTags}>
								{metadata.tags.map((tag: string) => (
									<Link
										key={tag}
										href={`/blog/tag/${tag}`}
										className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
										aria-label={`${t.a11y.viewTaggedPosts.replace("{tag}", tag)}`}
									>
										#{tag}
									</Link>
								))}
							</nav>
						)}
					</header>

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
