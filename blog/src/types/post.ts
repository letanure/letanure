export interface PostMetadata {
	title: string;
	date: string;
	summary: string;
	tags: string[];
}

export interface Post {
	slug: string;
	metadata: PostMetadata;
	content: React.ComponentType;
}
