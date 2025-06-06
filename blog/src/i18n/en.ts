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
		description: "Thoughts, stories and ideas.",
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

	// Accessibility
	a11y: {
		skipToContent: "Skip to main content",
		postContent: "Post content",
		postTags: "Post tags",
		viewTaggedPosts: "View posts tagged with {tag}",
		publicationDate: "Publication date",
		technologiesUsed: "Technologies used in {project}",
		noProjects: "No projects found",
		errorMessage: "Error message",
		blogDescription: "Blog description",
		blogPosts: "Blog posts",
		readPost: "Read post: {title}",
		postSummary: "Post summary",
	},

	// Error messages
	errors: {
		loadingProjects:
			"Sorry, there was an error loading the projects. Please try again later.",
		loadingAbout:
			"Sorry, there was an error loading the about content. Please try again later.",
		loadingNow:
			"Sorry, there was an error loading the now content. Please try again later.",
		loadingPost:
			"Sorry, there was an error loading the blog post. Please try again later.",
	},
} as const;

export type Translation = typeof en;
