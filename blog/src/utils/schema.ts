import { siteConfig } from "@/config/site";
import type { BlogPostSchema, BlogListSchema } from "@/types/schema";

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
			name: siteConfig.name,
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
			name: siteConfig.name,
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
			name: siteConfig.name,
		},
		// sameAs: siteConfig.author.socials,
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
	posts: Array<{
		title: string;
		description: string;
		date: string;
		url: string;
		tags: string[];
	}>;
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
			description: post.description,
			datePublished: post.date,
			dateModified: post.date,
			url: post.url,
			keywords: post.tags.join(", "),
			author: {
				"@type": "Person",
				name: "Luiz Tanure",
				url: "https://letanure.dev",
			},
		})),
	};
}
