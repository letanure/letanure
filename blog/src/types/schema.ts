export interface BlogPostSchema {
	"@context": "https://schema.org";
	"@type": "BlogPosting";
	headline: string;
	description: string;
	datePublished: string;
	dateModified: string;
	url: string;
	keywords: string;
	author: {
		"@type": "Person";
		name: string;
		url: string;
	};
}

export interface BlogListSchema {
	"@context": "https://schema.org";
	"@type": "Blog";
	name: string;
	description: string;
	url: string;
	blogPost: Array<{
		"@type": "BlogPosting";
		headline: string;
		description: string;
		datePublished: string;
		dateModified: string;
		url: string;
		keywords: string;
		author: {
			"@type": "Person";
			name: string;
			url: string;
		};
	}>;
}

export interface WebSiteSchema {
	"@context": "https://schema.org";
	"@type": "WebSite";
	name: string;
	description: string;
	url: string;
	author: {
		"@type": "Person";
		name: string;
		url: string;
	};
	publisher: {
		"@type": "Organization";
		name: string;
		logo: {
			"@type": "ImageObject";
			url: string;
		};
	};
	potentialAction: {
		"@type": "SearchAction";
		target: string;
		"query-input": string;
	};
}

export interface ItemListSchema {
	"@context": "https://schema.org";
	"@type": "ItemList";
	name: string;
	description: string;
	url: string;
	numberOfItems: number;
	itemListElement: Array<{
		"@type": "ListItem";
		position: number;
		item: {
			"@type": "CreativeWork";
			name: string;
			description: string;
			keywords?: string;
		};
	}>;
}
