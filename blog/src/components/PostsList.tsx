import Link from "next/link";
import { getAllPostsMeta } from "@/utils/mdx";
import { Tag } from "@/components/ui/Tag";

function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

type PostsListProps = {
	limit?: number | null;
};

export default async function PostsList({ limit }: PostsListProps) {
	const allPosts = await getAllPostsMeta();
	const posts = limit ? allPosts.slice(0, limit) : allPosts;
	return (
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
								<Tag key={tag} text={tag} href={`/blog/tag/${tag}`} />
							))}
						</div>
					)}
				</li>
			))}
		</ul>
	);
}
