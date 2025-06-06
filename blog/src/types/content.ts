export interface BaseContent {
	title: string;
	body: string;
}

export interface AboutContent {
	title: string;
	subtitle: string;
	hero: {
		image: string;
		alt: string;
		brief: string;
	};
	skills: {
		categories: Array<{
			name: string;
			items: string[];
		}>;
	};
	experience: Array<{
		title: string;
		company: string;
		period: string;
		description: string;
	}>;
	interests: Array<{
		title: string;
		description: string;
		icon: string;
	}>;
	contact: {
		email: string;
		location: string;
		social: Array<{
			name: string;
			url: string;
			icon: string;
		}>;
	};
}

export interface NowItem {
	title: string;
	description: string;
	status?: string;
}

export interface NowCategory {
	name: string;
	items: NowItem[];
}

export interface NowContent {
	title: string;
	description: string;
	lastUpdated: string;
	categories: NowCategory[];
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
