import Link from "next/link";
import { getTranslation } from "@/i18n";

const t = getTranslation();

interface TagCountsProps {
	posts: Array<{
		tags?: string[];
	}>;
}

export default function TagCounts({ posts }: TagCountsProps) {
	// Count tags
	const tagCounts = posts.reduce(
		(acc, post) => {
			if (post.tags) {
				for (const tag of post.tags) {
					acc[tag] = (acc[tag] || 0) + 1;
				}
			}
			return acc;
		},
		{} as Record<string, number>,
	);

	// Sort tags by count (descending)
	const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

	return (
		<div className="space-y-2">
			<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
				Tags
			</h2>
			<div className="max-h-[400px] overflow-y-auto pr-2">
				{sortedTags.map(([tag, count]) => (
					<Link
						key={tag}
						href={`/blog/tag/${tag}`}
						className="flex items-center justify-between px-3 py-2 text-sm bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mb-2"
						aria-label={`${t.a11y.viewTaggedPosts.replace("{tag}", tag)} (${count} posts)`}
					>
						<span className="text-gray-700 dark:text-gray-300">#{tag}</span>
						<span className="text-gray-500 dark:text-gray-400 text-xs">
							{count}
						</span>
					</Link>
				))}
			</div>
		</div>
	);
}
