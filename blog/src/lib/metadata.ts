import type { Metadata } from "next";
import { siteConfig } from "@/i18n/en";

interface GenerateMetadataProps {
	title?: string;
	description?: string;
	path?: string;
	image?: string;
}

export function generateMetadata({
	title,
	description,
	path,
	image,
}: GenerateMetadataProps = {}): Metadata {
	const metadata: Metadata = {
		title: title
			? siteConfig.metadata.title.template.replace("%s", title)
			: siteConfig.metadata.title.default,
		description: description || siteConfig.metadata.description,
		keywords: [...siteConfig.metadata.keywords],
		authors: [
			{
				name: siteConfig.author.name,
				url: siteConfig.author.url,
			},
		],
		creator: siteConfig.author.name,
		openGraph: {
			type: "website",
			locale: "en_US",
			url: path ? `${siteConfig.url}${path}` : siteConfig.url,
			title: title
				? siteConfig.metadata.title.template.replace("%s", title)
				: siteConfig.metadata.title.default,
			description: description || siteConfig.metadata.description,
			siteName: siteConfig.name,
			images: image
				? [
						{
							url: image,
							width: 1200,
							height: 630,
							alt: title || siteConfig.name,
						},
					]
				: [],
		},
		twitter: {
			card: "summary_large_image",
			title: title
				? siteConfig.metadata.title.template.replace("%s", title)
				: siteConfig.metadata.title.default,
			description: description || siteConfig.metadata.description,
			images: image ? [image] : [],
			creator: siteConfig.social.twitter.handle,
		},
		icons: {
			icon: "/favicon.ico",
			shortcut: "/favicon-16x16.png",
			apple: "/apple-touch-icon.png",
		},
		// manifest: "/site.webmanifest",
	};

	return metadata;
}
