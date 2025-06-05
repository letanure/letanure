import Link from "next/link";
import { getAllPostsMeta } from "@/utils/mdx";
import TagCounts from "@/components/TagCounts";

function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export default async function BlogIndexPage() {
	const posts = await getAllPostsMeta();
	return (
		<section className="max-w-2xl mx-auto">
			<h1 className="text-3xl font-bold mb-6">Blog</h1>
			<TagCounts posts={posts} />
			<ul className="space-y-6">
				{posts.map((post) => (
					<li key={post.slug} className="border-b pb-4">
						<Link
							href={`/blog/${post.slug}`}
							className="text-xl font-semibold hover:underline"
						>
							{post.title}
						</Link>
						<p className="text-gray-500 text-sm">{formatDate(post.date)}</p>
						<p className="mt-1 text-gray-700">{post.summary}</p>
						{post.tags && post.tags.length > 0 && (
							<div className="flex gap-2 mt-2">
								{post.tags.map((tag) => (
									<Link
										key={tag}
										href={`/blog/tag/${tag}`}
										className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
									>
										#{tag}
									</Link>
								))}
							</div>
						)}
					</li>
				))}
			</ul>
		</section>
	);
}
