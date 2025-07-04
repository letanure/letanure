import { notFound } from "next/navigation";
// import type { Metadata } from "next";

// import { generateMetadata as generateSiteMetadata } from "@/lib/metadata";
import { getTranslation } from "@/i18n";
import { generateBlogPostSchema } from "@/lib/schema";
import { siteConfig } from "@/siteConfig";
import { ItemSummary } from "@/components/ui/ItemSummary";
import { Title } from "@/components/ui/Title";
import { TagList } from "@/components/ui/TagList";
import PostsList from "@/components/PostsList";

const t = getTranslation();

interface Props {
	params: Promise<{ slug: string }>;
}

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
// 	try {
// 		const { slug } = await params;
// 		const post = await import(`@/content/mdx/${slug}.mdx`);
// 		return generateSiteMetadata({
// 			title: post.metadata.title,
// 			description: post.metadata.summary,
// 			path: `/blog/${slug}`,
// 		});
// 	} catch (error) {
// 		console.error("Error generating metadata:", error);
// 		return generateSiteMetadata({
// 			title: t.blog.title,
// 			description: t.blog.description,
// 			path: "/blog",
// 		});
// 	}
// }

// export async function generateStaticParams() {
// 	const posts = await import.meta.glob<{
// 		metadata: { title: string; date: string; summary: string; tags: string[] };
// 	}>("@/content/mdx/*.mdx");
// 	return Object.keys(posts).map((path) => ({
// 		slug: path.replace(/^.*[\\\/]/, "").replace(/\.mdx$/, ""),
// 	}));
// }

export default async function BlogPostPage({ params }: Props) {
	const { slug } = await params;

	const post = await import(`../../../../../content/posts/${slug}.mdx`);
	const { metadata, default: Content } = post;

	if (!post) {
		notFound();
	}
	try {
		const postUrl = `${siteConfig.url}/blog/${slug}`;
		const schema = generateBlogPostSchema({
			title: metadata.title,
			description: metadata.summary,
			date: metadata.date,
			url: postUrl,
			tags: metadata.tags,
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
					<article
						aria-labelledby="post-title"
						className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3"
					>
						<div className="lg:col-span-2">
							<div className="mb-16">
								<ItemSummary
									as="header"
									slug={slug}
									title={metadata.title}
									date={metadata.date}
									tags={metadata.tags}
									hasBorder={false}
									isLink={false}
								/>
							</div>
							<div className="prose space-y-5" aria-label={t.a11y.postContent}>
								<Content />
							</div>
						</div>
						<div className="lg:col-span-1">
							<div className="sticky top-8">
								<div className="space-y-5 mb-15">
									<Title title="Recent posts" tag="h3" />
									<PostsList limit={3} showTags={false} />
								</div>
								<div className="space-y-5">
									<Title title={t.general.tags} tag="h3" />
									<TagList
										as="nav"
										tags={metadata.tags}
										showCount={true}
										className="mt-4 flex flex-wrap gap-2"
										aria-label={t.a11y.postTags}
									/>
								</div>
							</div>
						</div>
					</article>
				</div>
			</>
		);
	} catch (error) {
		console.error("Error loading blog post:", error);
		notFound();
	}
}
