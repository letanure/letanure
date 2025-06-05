import type { Metadata } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import { generateMetadata as generateSiteMetadata } from "@/app/metadata";
import { getTranslation } from "@/i18n";
import type { NowContent } from "@/types/content";
import { generateWebPageSchema } from "@/utils/schema";
import { siteConfig } from "@/config/site";

const t = getTranslation();

export const metadata: Metadata = generateSiteMetadata({
	title: t.now.title,
	description: t.now.description,
	path: "/now",
});

async function getNowContent(locale = "en"): Promise<NowContent> {
	const filePath = path.join(
		process.cwd(),
		`src/content/json/now.${locale}.json`,
	);
	const data = await fs.readFile(filePath, "utf8");
	const content = JSON.parse(data);

	// Validate the content structure
	if (!content || typeof content !== "object") {
		throw new Error("Invalid now content: content must be an object");
	}

	if (!content.title || typeof content.title !== "string") {
		throw new Error("Invalid now content: title must be a string");
	}

	if (!content.body || typeof content.body !== "string") {
		throw new Error("Invalid now content: body must be a string");
	}

	return content as NowContent;
}

export default async function NowPage() {
	try {
		const content = await getNowContent();
		const nowUrl = `${siteConfig.url}/now`;
		const schema = generateWebPageSchema({
			title: content.title,
			description: t.now.description,
			url: nowUrl,
		});

		return (
			<>
				<script
					type="application/ld+json"
					suppressHydrationWarning
					{...{ __html: JSON.stringify(schema) }}
				/>
				<article
					className="prose prose-gray dark:prose-invert max-w-none"
					aria-labelledby="now-title"
				>
					<h1
						id="now-title"
						className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
					>
						{content.title}
					</h1>
					<div
						className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
						aria-label={t.a11y.postContent}
					>
						{content.body}
					</div>
					<div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
						Last updated: {content.lastUpdated}
					</div>
				</article>
			</>
		);
	} catch (error) {
		console.error("Error loading now content:", error);
		return (
			<article
				className="prose prose-gray dark:prose-invert max-w-none"
				aria-labelledby="error-title"
			>
				<h1
					id="error-title"
					className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
				>
					{t.now.title}
				</h1>
				<div
					className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
					role="alert"
					aria-label={t.a11y.errorMessage}
				>
					{t.errors.loadingNow}
				</div>
			</article>
		);
	}
}
