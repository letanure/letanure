export const siteConfig = {
	name: "Luiz Tanure",
	email: "letanure@gmail.com",
	url: "https://letanure.dev",
	description: "Frontend Developer & Tech Enthusiast",
	links: {
		twitter: "https://twitter.com/letanure",
		github: "https://github.com/letanure",
		linkedin: "https://linkedin.com/in/letanure",
	},
	author: {
		name: "Luiz Tanure",
		email: "letanure@gmail.com",
		url: "https://letanure.dev",
	},
	metadata: {
		title: {
			default: "Luiz Tanure - Personal Blog",
			template: "%s | Luiz Tanure",
		},
		description:
			"A personal blog about web development, programming, and technology.",
		keywords: [
			"web development",
			"programming",
			"technology",
			"frontend",
			"react",
			"next.js",
			"typescript",
		],
	},
	social: {
		twitter: {
			handle: "@letanure",
			url: "https://twitter.com/letanure",
		},
		github: {
			handle: "letanure",
			url: "https://github.com/letanure",
		},
		linkedin: {
			handle: "letanure",
			url: "https://linkedin.com/in/letanure",
		},
	},
} as const;

export type SiteConfig = typeof siteConfig;
