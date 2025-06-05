import { Metadata } from "next";
import { getTranslation } from "@/i18n";

const t = getTranslation();

const siteConfig = {
	name: t.site.name,
	title: t.site.title,
	description: t.site.description,
	url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
	author: t.site.name,
	twitterHandle: "@yourhandle",
	defaultLanguage: "en",
};

export const defaultMetadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: siteConfig.title,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	authors: [{ name: siteConfig.author }],
	creator: siteConfig.author,
	openGraph: {
		type: "website",
		locale: siteConfig.defaultLanguage,
		url: siteConfig.url,
		title: siteConfig.title,
		description: siteConfig.description,
		siteName: siteConfig.name,
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.title,
		description: siteConfig.description,
		creator: siteConfig.twitterHandle,
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	verification: {
		// Add your verification tokens here
		// google: 'your-google-site-verification',
		// yandex: 'your-yandex-verification',
	},
};

export function generateMetadata({
	title,
	description,
	path,
	image,
}: {
	title?: string;
	description?: string;
	path?: string;
	image?: string;
}): Metadata {
	const url = path ? `${siteConfig.url}${path}` : siteConfig.url;
	const ogImage = image
		? `${siteConfig.url}${image}`
		: `${siteConfig.url}/og-image.png`;

	return {
		...defaultMetadata,
		title: title ? `${title} | ${siteConfig.name}` : defaultMetadata.title,
		description: description || defaultMetadata.description,
		openGraph: {
			...defaultMetadata.openGraph,
			url,
			title: title ? `${title} | ${siteConfig.name}` : defaultMetadata.title,
			description: description || defaultMetadata.description,
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: title || siteConfig.name,
				},
			],
		},
		twitter: {
			...defaultMetadata.twitter,
			title: title ? `${title} | ${siteConfig.name}` : defaultMetadata.title,
			description: description || defaultMetadata.description,
			images: [ogImage],
		},
	};
}
