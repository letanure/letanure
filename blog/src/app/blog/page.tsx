import type { Metadata } from "next";
import Link from "next/link";
import { generateMetadata as generateSiteMetadata } from "@/app/metadata";
import { getTranslation } from "@/i18n";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/app/blog/utils";
import { generateBlogListSchema } from "@/utils/schema";
import { getBlogPosts } from "@/app/blog/utils";

const t = getTranslation();

export const metadata: Metadata = generateSiteMetadata({
	title: t.blog.title,
	description: t.blog.description,
	path: "/blog",
});

export default async function BlogPage() {
	const posts = getBlogPosts();

	// Sort posts by date
	const sortedPosts = posts.sort((a, b) =>
		new Date(a.metadata.date) > new Date(b.metadata.date) ? 1 : -1,
	);

	const schema = generateBlogListSchema({
		title: t.blog.title,
		description: t.blog.description,
		url: `${siteConfig.url}/blog`,
		posts: sortedPosts.map((post) => ({
			title: post.metadata.title,
			description: post.metadata.summary,
			date: post.metadata.date,
			url: `${siteConfig.url}/blog/${post.slug}`,
			tags: post.tags,
		})),
	});

	return (
		<>
			<script
				type="application/ld+json"
				suppressHydrationWarning
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
			/>
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<div className="mx-auto max-w-2xl lg:mx-0">
					<h1
						className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
						id="blog-title"
					>
						{t.blog.title}
					</h1>
					<p
						className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300"
						aria-label={t.a11y.blogDescription}
					>
						{t.blog.description}
					</p>
				</div>
				<div
					className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
					aria-label={t.a11y.blogPosts}
				>
					{sortedPosts.map(
						({ metadata: { title, date, summary, tags }, slug, content }) => (
							<article key={slug} className="flex flex-col items-start">
								<div className="flex items-center gap-x-4 text-xs">
									<time
										dateTime={date}
										className="text-gray-500 dark:text-gray-400"
										aria-label={t.a11y.publicationDate}
									>
										{formatDate(date)}
									</time>
									{tags && tags.length > 0 && (
										<nav
											className="flex flex-wrap gap-2"
											aria-label={t.a11y.postTags}
										>
											{tags.map((tag: string) => (
												<Link
													key={tag}
													href={`/blog/tag/${tag}`}
													className="relative z-10 rounded-full bg-gray-50 dark:bg-gray-800 px-3 py-1.5 font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
													aria-label={`${t.a11y.viewTaggedPosts.replace("{tag}", tag)}`}
												>
													{tag} a
												</Link>
											))}
										</nav>
									)}
								</div>
								<div className="group relative">
									<h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300">
										<Link
											href={`/blog/${slug}`}
											aria-label={`${t.a11y.postContent.replace("{title}", title)}`}
										>
											<span className="absolute inset-0" />
											{title}
										</Link>
									</h3>
									<p
										className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300"
										aria-label={t.a11y.postSummary}
									>
										{summary}
									</p>
								</div>
							</article>
						),
					)}
				</div>
			</div>
		</>
	);
}
