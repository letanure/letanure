import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { postMetadataGetAll } from "@/lib/mdx";
import PostsList from "@/components/PostsList";
import { generateMetadata as generateSiteMetadata } from "@/lib/metadata";
import { Title } from "@/components/ui/Title";
import { TagList } from "@/components/ui/TagList";
import { getTranslation } from "@/i18n";

const t = getTranslation();

interface Props {
	params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { tag } = await params;
	const originalTag = tag.replace(/-/g, ' ');
	const posts = postMetadataGetAll().filter((post) => post.tags.includes(originalTag));

	return generateSiteMetadata({
		title: `Posts tagged with #${originalTag}`,
		description: `Browse all ${posts.length} posts tagged with #${originalTag} on my blog.`,
		path: `/blog/tag/${tag}`,
	});
}

// export async function generateStaticParams() {
// 	const tags = await postTagsAllGet();
// 	return tags.map((tag) => ({ tag: String(tag) }));
// }

// function formatDate(dateString: string) {
// 	return new Date(dateString).toLocaleDateString("en-US", {
// 		year: "numeric",
// 		month: "long",
// 		day: "numeric",
// 	});
// }

export default async function TagPage({ params }: Props) {
	const { tag } = await params;
	const originalTag = tag.replace(/-/g, ' ');
	const postsAll = postMetadataGetAll();
	const postsWithTag = postsAll.filter((post) => post.tags.includes(originalTag));
	const allTags = postsAll.flatMap((post) => post.tags || []);

	if (postsWithTag.length === 0) {
		notFound();
	}

	return (
		<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
			<div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<div className="mb-16">
						<Title
							title={`Posts tagged with #${originalTag}`}
							tag="h1"
							// subtitle={t.blog.description}
							// ariaTitle={t.a11y.blogTitle}
							// ariaSubtitle={t.a11y.blogDescription}
						/>

						<div className="space-y-16">
							<PostsList />
						</div>
					</div>
				</div>
				<div className="lg:col-span-1">
					<div className="sticky top-8">
						<Title title={t.general.tags} tag="h3" />

						<TagList
							as="nav"
							tags={allTags}
							showCount={true}
							className="mt-4 flex flex-wrap gap-2"
							aria-label={t.a11y.postTags}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
