import type { Metadata } from "next";
import { generateMetadata as generateSiteMetadata } from "@/lib/metadata";
import { getTranslation } from "@/i18n";
import { siteConfig } from "@/siteConfig";
import { generateBlogListSchema } from "@/lib/schema";
import { postMetadataGetAll } from "@/lib/mdx";
import { Title } from "@/components/ui/Title";
import PostsList from "@/components/PostsList";
import { TagList } from "@/components/ui/TagList";
// import type { Post } from "@/types/post";

const t = getTranslation();

export const metadata: Metadata = generateSiteMetadata({
	title: t.blog.title,
	description: t.blog.description,
	path: "/blog",
});

export default async function BlogPage() {
	const posts = postMetadataGetAll();
	const allTags = posts.flatMap((post) => post.tags || []);

	const schema = generateBlogListSchema({
		title: t.blog.title,
		description: t.blog.description,
		url: `${siteConfig.url}/blog`,
		posts: posts,
	});

	return (
		<>
			<script
				type="application/ld+json"
				suppressHydrationWarning
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
			/>
			<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
				<div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
					<div className="lg:col-span-2">
						<div className="mb-16">
							<Title
								title={t.blog.title}
								tag="h1"
								subtitle={t.blog.description}
								// ariaTitle={t.a11y.blogTitle}
								ariaSubtitle={t.a11y.blogDescription}
							/>
						</div>
						<div className="space-y-16" aria-label={t.a11y.blogPosts}>
							<PostsList />
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
		</>
	);
}
