import { ItemSummary } from "@/components/ui/ItemSummary";
import { postMetadataGetAll } from "@/lib/mdx";

type PostsListProps = {
	limit?: number | null;
	showTags?: boolean;
	currentSlug?: string;
};

export default async function PostsList({ limit, showTags, currentSlug }: PostsListProps) {
	const allPosts = await postMetadataGetAll();
	const filteredPosts = currentSlug 
		? allPosts.filter(post => post.slug !== currentSlug)
		: allPosts;
	const posts = limit ? filteredPosts.slice(0, limit) : filteredPosts;
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
