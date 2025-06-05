import Link from "next/link";
import { PostMeta } from "@/utils/mdx";

interface TagCountsProps {
	posts: PostMeta[];
}

export default function TagCounts({ posts }: TagCountsProps) {
	// Count occurrences of each tag
	const tagCounts = posts.reduce(
		(acc, post) => {
			post.tags.forEach((tag) => {
				acc[tag] = (acc[tag] || 0) + 1;
			});
			return acc;
		},
		{} as Record<string, number>,
	);

	// Sort tags by count (descending) and then alphabetically
	const sortedTags = Object.entries(tagCounts).sort((a, b) => {
		if (b[1] !== a[1]) return b[1] - a[1];
		return a[0].localeCompare(b[0]);
	});

	return (
		<div className="mb-8">
			<h2 className="text-xl font-semibold mb-4">Tags</h2>
			<div className="flex flex-wrap gap-2">
				{sortedTags.map(([tag, count]) => (
					<Link
						key={tag}
						href={`/blog/tag/${tag}`}
						className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
					>
						<span>#{tag}</span>
						<span className="text-xs text-gray-500 dark:text-gray-400">
							({count})
						</span>
					</Link>
				))}
			</div>
		</div>
	);
}
