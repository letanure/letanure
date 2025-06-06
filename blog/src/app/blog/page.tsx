import type { Metadata } from "next";
import Link from "next/link";
import { generateMetadata as generateSiteMetadata } from "@/app/metadata";
import { getTranslation } from "@/i18n";
import { siteConfig } from "@/config/site";

const t = getTranslation();

function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export const metadata: Metadata = generateSiteMetadata({
	title: t.blog.title,
	description: t.blog.description,
	path: "/blog",
});

export default async function BlogPage() {
	const posts = await import.meta.glob<{
		metadata: { title: string; date: string; summary: string; tags: string[] };
	}>("@/content/mdx/*.mdx");
	const postEntries = await Promise.all(
		Object.entries(posts).map(async ([path, resolver]) => {
			const post = await resolver();
			const slug = path.replace(/^.*[\\\/]/, "").replace(/\.mdx$/, "");
			return {
				slug,
				...post.metadata,
			};
		}),
	);

	// Sort posts by date
	const sortedPosts = postEntries.sort((a, b) => (a.date < b.date ? 1 : -1));

	return (
		<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
			<div className="mx-auto max-w-2xl lg:mx-0">
				<h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
					{t.blog.title}
				</h1>
				<p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
					{t.blog.description}
				</p>
			</div>
			<div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
				{sortedPosts.map((post) => (
					<article key={post.slug} className="flex flex-col items-start">
						<div className="flex items-center gap-x-4 text-xs">
							<time
								dateTime={post.date}
								className="text-gray-500 dark:text-gray-400"
							>
								{formatDate(post.date)}
							</time>
							{post.tags && post.tags.length > 0 && (
								<div className="flex flex-wrap gap-2">
									{post.tags.map((tag) => (
										<Link
											key={tag}
											href={`/blog/tag/${tag}`}
											className="relative z-10 rounded-full bg-gray-50 dark:bg-gray-800 px-3 py-1.5 font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
										>
											{tag}
										</Link>
									))}
								</div>
							)}
						</div>
						<div className="group relative">
							<h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300">
								<Link href={`/blog/${post.slug}`}>
									<span className="absolute inset-0" />
									{post.title}
								</Link>
							</h3>
							<p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
								{post.summary}
							</p>
						</div>
					</article>
				))}
			</div>
		</div>
	);
}
