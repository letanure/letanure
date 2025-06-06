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
