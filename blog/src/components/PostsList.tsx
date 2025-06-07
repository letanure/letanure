import { ItemSummary } from "@/components/ui/ItemSummary";
import { dateFormat, postMetaAllGet } from "@/lib/utils";

type PostsListProps = {
	limit?: number | null;
};

export default async function PostsList({ limit }: PostsListProps) {
	const allPosts = await postMetaAllGet();
	const posts = limit ? allPosts.slice(0, limit) : allPosts;
	return (
		<ul className="space-y-6">
			{posts.map((post) => (
				<ItemSummary
					key={post.slug}
					slug={post.slug}
					title={post.title}
					date={dateFormat(post.date)}
					summary={post.summary}
					tags={post.tags}
					as="li"
				/>
			))}
		</ul>
	);
}
