import { ItemSummary } from "@/components/ui/ItemSummary";
import { postMetadataGetAll } from "@/lib/mdx";

type PostsListProps = {
	limit?: number | null;
	showTags?: boolean;
};

export default async function PostsList({ limit, showTags }: PostsListProps) {
	const allPosts = await postMetadataGetAll();
	const posts = limit ? allPosts.slice(0, limit) : allPosts;
	return (
		<ul className="space-y-6">
			{posts.map((post) => (
				<ItemSummary
					key={post.slug}
					slug={post.slug}
					title={post.title}
					date={post.date}
					summary={post.summary}
					tags={post.tags}
					as="li"
					showTags={showTags}
				/>
			))}
		</ul>
	);
}
