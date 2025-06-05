import { notFound } from "next/navigation";
import { getPostsByTag, getAllTags } from "@/utils/mdx";
import Link from "next/link";

function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export async function generateStaticParams() {
	const tags = await getAllTags();
	return tags.map((tag) => ({ tag }));
}

export default async function TagPage({
	params,
}: {
	params: { tag: string };
}) {
	const { tag } = params;
	const posts = await getPostsByTag(tag);

	if (posts.length === 0) {
		notFound();
	}

	return (
		<div className="max-w-2xl mx-auto">
			<h1 className="text-3xl font-bold mb-8">Posts tagged with #{tag}</h1>
			<div className="space-y-8">
				{posts.map((post) => (
					<article key={post.slug} className="border-b pb-8">
						<Link href={`/blog/${post.slug}`}>
							<h2 className="text-2xl font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
								{post.title}
							</h2>
						</Link>
						<p className="text-gray-500 text-sm mt-2">
							{formatDate(post.date)}
						</p>
						<p className="mt-2 text-gray-600 dark:text-gray-300">
							{post.summary}
						</p>
						<div className="flex gap-2 mt-4">
							{post.tags.map((postTag) => (
								<Link
									key={postTag}
									href={`/blog/tag/${postTag}`}
									className={`px-3 py-1 text-sm rounded-full transition-colors ${
										postTag === tag
											? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
											: "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
									}`}
								>
									#{postTag}
								</Link>
							))}
						</div>
					</article>
				))}
			</div>
		</div>
	);
}
