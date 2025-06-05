export const en = {
	// Site metadata
	site: {
		name: "Luiz Tanure",
		title: "Luiz Tanure - Personal Blog",
		description:
			"A personal blog about web development, programming, and technology.",
	},

	// Navigation
	nav: {
		home: "Home",
		blog: "Blog",
		about: "About",
		now: "Now",
		projects: "Projects",
	},

	// Blog
	blog: {
		title: "Blog",
		description:
			"Read my latest blog posts about web development, programming, and technology.",
		readMore: "Read more",
		publishedOn: "Published on",
		tags: "Tags",
	},

	// Tag pages
	tags: {
		title: "Posts tagged with #{tag}",
		description: "Browse all {count} posts tagged with #{tag} on my blog.",
	},

	// About page
	about: {
		title: "About",
		description: "Learn more about me, my background, and my interests.",
	},

	// Now page
	now: {
		title: "Now",
		description: "What I'm currently working on, learning, and focusing on.",
	},

	// Projects page
	projects: {
		title: "Projects",
		description:
			"Explore my current and past projects in web development and technology.",
	},
} as const;

export type Translation = typeof en;
