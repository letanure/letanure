import type { Metadata } from "next";
import Link from "next/link";
import { generateMetadata as generateSiteMetadata } from "@/app/metadata";
import { getTranslation } from "@/i18n";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/app/blog/utils";
import { generateBlogListSchema } from "@/utils/schema";
import { getBlogPosts } from "@/app/blog/utils";
import { Title } from "@/components/ui/Title";
import PostsList from "@/components/PostsList";
// import type { Post } from "@/types/post";

const t = getTranslation();

export const metadata: Metadata = generateSiteMetadata({
	title: t.blog.title,
	description: t.blog.description,
	path: "/blog",
});

export default async function BlogPage() {
	const posts = getBlogPosts();

	// Sort posts by date
	// const sortedPosts = posts;
	const sortedPosts = posts.sort(
		(a, b) =>
			new Date(b.metadata.date as string).getTime() -
			new Date(a.metadata.date as string).getTime(),
	);
	// const sortedPosts = posts.sort((a, b) =>
	// 	new Date(a.metadata.date) > new Date(b.metadata.date) ? 1 : -1,
	// );

	// Get unique tags and their counts
	const tagCounts = sortedPosts.reduce(
		(acc, post) => {
			if (Array.isArray(post.metadata.tags)) {
				for (const tag of post.metadata.tags) {
					acc[tag] = (acc[tag] || 0) + 1;
				}
			}
			return acc;
		},
		{} as Record<string, number>,
	);

	const schema = generateBlogListSchema({
		title: t.blog.title,
		description: t.blog.description,
		url: `${siteConfig.url}/blog`,
		posts:
			sortedPosts.map((post) => ({
				title: post.metadata.title,
				description: post.metadata.summary,
				date: `${post.metadata.date}`,
				url: `${siteConfig.url}/blog/${post.slug}`,
				tags: post.metadata.tags || [],
			})) || [],
	});

	return (
		<>
			<script
				type="application/ld+json"
				suppressHydrationWarning
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
			/>
			<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
				<div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
					<div className="lg:col-span-2">
						<div className="mb-16">
							<Title
								title={t.blog.title}
								tag="h1"
								subtitle={t.blog.description}
								// ariaTitle={t.a11y.blogTitle}
								ariaSubtitle={t.a11y.blogDescription}
							/>
						</div>
						<div className="space-y-16" aria-label={t.a11y.blogPosts}>
							<PostsList />
						</div>
					</div>
					<div className="lg:col-span-1">
						<div className="sticky top-8">
							<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
								Tags
							</h2>
							<nav
								className="mt-4 flex flex-wrap gap-2"
								aria-label={t.a11y.postTags}
							>
								{Object.entries(tagCounts)
									.sort(([, a], [, b]) => b - a)
									.map(([tag, count]) => (
										<Link
											key={tag}
											href={`/blog/tag/${tag}`}
											className="relative z-10 rounded-full bg-gray-50 dark:bg-gray-800 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
											aria-label={`${t.a11y.viewTaggedPosts.replace("{tag}", tag)}`}
										>
											{tag} ({count})
										</Link>
									))}
							</nav>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
