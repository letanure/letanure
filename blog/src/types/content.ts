export interface BaseContent {
	title: string;
	body: string;
}

export type AboutContent = BaseContent;

export interface NowContent extends BaseContent {
	lastUpdated: string;
}

export interface Project {
	title: string;
	description: string;
	technologies: string[];
	link?: string;
}

export interface ProjectsContent extends BaseContent {
	projects: Project[];
}

export interface BlogPost {
	slug: string;
	title: string;
	date: string;
	summary: string;
	tags: string[];
	content: string;
}
