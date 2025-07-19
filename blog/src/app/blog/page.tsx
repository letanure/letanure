import type { Metadata } from "next";
import { generateMetadata as generateSiteMetadata } from "@/lib/metadata";
import { getTranslation } from "@/i18n";
import { siteConfig } from "@/siteConfig";
import { generateBlogListSchema } from "@/lib/schema";
import { postMetadataGetAll } from "@/lib/mdx";
import { Title } from "@/components/ui/Title";
import PostsList from "@/components/PostsList";
import { TagList } from "@/components/ui/TagList";

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
			<div className="py-8 sm:py-12">
				<div className="mb-12">
					<h1 className="text-4xl font-bold text-[#292929] dark:text-[#E6E6E6] mb-4">
						{t.blog.title}
					</h1>
					<p className="text-lg text-[#6B6B6B] dark:text-[#8F8F8F]">
						{t.blog.description}
					</p>
				</div>
				
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
					<div className="lg:col-span-7">
						<div aria-label={t.a11y.blogPosts}>
							<PostsList />
						</div>
					</div>
					
					<aside className="lg:col-span-5">
						<div className="sticky top-24 space-y-8">
							<div>
								<h2 className="text-xl font-semibold text-[#292929] dark:text-[#E6E6E6] mb-4">
									{t.general.tags}
								</h2>
								<TagList
									as="nav"
									tags={allTags}
									showCount={true}
									className="flex flex-wrap gap-2"
									aria-label={t.a11y.postTags}
								/>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</>
	);
}