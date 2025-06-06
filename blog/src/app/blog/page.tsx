import type { Metadata } from "next";
import { getAllPostsMeta } from "@/utils/mdx";
import Link from "next/link";
import { generateMetadata as generateSiteMetadata } from "@/app/metadata";
import { getTranslation } from "@/i18n";
import TagCounts from "@/components/TagCounts";
import { generateBlogSchema } from "@/utils/schema";
import { siteConfig } from "@/config/site";

const t = getTranslation();

export const metadata: Metadata = generateSiteMetadata({
	title: t.blog.title,
	description: t.blog.description,
	path: "/blog",
});

function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export default async function BlogPage() {
	const posts = await getAllPostsMeta();
	const blogUrl = `${siteConfig.url}/blog`;
	const schema = generateBlogSchema({
		title: t.blog.title,
		description: t.blog.description,
		url: blogUrl,
		posts: posts.map((post) => ({
			title: post.title,
			description: post.summary,
			date: post.date,
			url: `${siteConfig.url}/blog/${post.slug}`,
		})),
	});

	return (
		<>
			<script
				type="application/ld+json"
				suppressHydrationWarning
				{...{ __html: JSON.stringify(schema) }}
			/>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Main content */}
					<div className="lg:flex-1">
						<h1 className="text-3xl font-bold mb-8">{t.blog.title}</h1>
						<div className="space-y-8">
							{posts.map((post) => (
								<article key={post.slug} className="border-b pb-8">
									<Link href={`/blog/${post.slug}`}>
										<h2 className="text-2xl font-semibold mb-2 hover:underline">
											{post.title}
										</h2>
									</Link>
									<p className="text-gray-500 text-sm mb-2">
										{formatDate(post.date)}
									</p>
									<p className="text-gray-700 mb-4">{post.summary}</p>
									{post.tags && post.tags.length > 0 && (
										<div className="flex flex-wrap gap-2">
											{post.tags.map((tag) => (
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
								</article>
							))}
						</div>
					</div>

					{/* Sidebar */}
					<div className="lg:w-64 flex-shrink-0">
						<div className="sticky top-8">
							<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
								<TagCounts posts={posts} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
