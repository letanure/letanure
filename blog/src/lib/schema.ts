import { siteConfig } from "@/i18n/en";
import type { BlogPostSchema, BlogListSchema } from "@/types/schema";
import type { PostMetadata } from "@/types/post";

export function generateBlogPostSchema({
	title,
	description,
	date,
	url,
	tags,
}: {
	title: string;
	description: string;
	date: string;
	url: string;
	tags: string[];
}): BlogPostSchema {
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: title,
		description,
		datePublished: date,
		dateModified: date,
		url,
		keywords: tags.join(", "),
		author: {
			"@type": "Person",
			name: "Luiz Tanure",
			url: "https://letanure.dev",
		},
	};
}

export function generateWebPageSchema({
	title,
	description,
	url,
}: {
	title: string;
	description: string;
	url: string;
}) {
	return {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: title,
		description,
		url,
		publisher: {
			"@type": "Organization",
			name: siteConfig.author.name,
			logo: {
				"@type": "ImageObject",
				url: `${siteConfig.url}/logo.png`,
			},
		},
	};
}

export function generateBlogSchema({
	title,
	description,
	url,
	posts,
}: {
	title: string;
	description: string;
	url: string;
	posts: Array<{
		title: string;
		description: string;
		date: string;
		url: string;
	}>;
}) {
	return {
		"@context": "https://schema.org",
		"@type": "Blog",
		name: title,
		description,
		url,
		publisher: {
			"@type": "Organization",
			name: siteConfig.author.name,
			logo: {
				"@type": "ImageObject",
				url: `${siteConfig.url}/logo.png`,
			},
		},
		blogPost: posts.map((post) => ({
			"@type": "BlogPosting",
			headline: post.title,
			description: post.description,
			datePublished: post.date,
			url: post.url,
		})),
	};
}

export function generatePersonSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name: siteConfig.author.name,
		url: siteConfig.url,
		// jobTitle: siteConfig.author.title,
		worksFor: {
			"@type": "Organization",
			name: siteConfig.author.name,
		},
		// sameAs: siteConfig.author.socials,
	};
}

export function generateWebSiteSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteConfig.name,
		description: siteConfig.description,
		url: siteConfig.url,
		author: {
			"@type": "Person",
			name: siteConfig.author.name,
			url: siteConfig.url,
		},
		publisher: {
			"@type": "Organization",
			name: siteConfig.author.name,
			logo: {
				"@type": "ImageObject",
				url: `${siteConfig.url}/logo.png`,
			},
		},
		potentialAction: {
			"@type": "SearchAction",
			target: `${siteConfig.url}/blog?search={search_term_string}`,
			"query-input": "required name=search_term_string",
		},
	};
}

export function generateItemListSchema({
	title,
	description,
	url,
	items,
}: {
	title: string;
	description: string;
	url: string;
	items: Array<{
		name: string;
		description: string;
		technologies?: readonly string[];
	}>;
}) {
	return {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: title,
		description,
		url,
		numberOfItems: items.length,
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			item: {
				"@type": "CreativeWork",
				name: item.name,
				description: item.description,
				...(item.technologies && {
					keywords: item.technologies.join(", "),
				}),
			},
		})),
	};
}

export function generateBlogListSchema({
	title,
	description,
	url,
	posts,
}: {
	title: string;
	description: string;
	url: string;
	posts: PostMetadata[];
}): BlogListSchema {
	return {
		"@context": "https://schema.org",
		"@type": "Blog",
		name: title,
		description,
		url,
		blogPost: posts.map((post) => ({
			"@type": "BlogPosting",
			headline: post.title,
			description: post.summary,
			datePublished: post.date,
			dateModified: post.date,
			url: `${siteConfig.url}/blog/${post.slug}`,
			keywords: post.tags.join(", "),
			author: {
				"@type": "Person",
				name: "Luiz Tanure",
				url: "https://letanure.dev",
			},
		})),
	};
}
