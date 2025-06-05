import type { Metadata } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import { generateMetadata as generateSiteMetadata } from "@/app/metadata";
import { getTranslation } from "@/i18n";
import type { AboutContent } from "@/types/content";

const t = getTranslation();

export const metadata: Metadata = generateSiteMetadata({
	title: t.about.title,
	description: t.about.description,
	path: "/about",
});

async function getAboutContent(locale = "en"): Promise<AboutContent> {
	const filePath = path.join(
		process.cwd(),
		`src/content/json/about.${locale}.json`,
	);
	const data = await fs.readFile(filePath, "utf8");
	const content = JSON.parse(data);

	// Validate the content structure
	if (!content || typeof content !== "object") {
		throw new Error("Invalid about content: content must be an object");
	}

	if (!content.title || typeof content.title !== "string") {
		throw new Error("Invalid about content: title must be a string");
	}

	if (!content.body || typeof content.body !== "string") {
		throw new Error("Invalid about content: body must be a string");
	}

	return content as AboutContent;
}

export default async function AboutPage() {
	try {
		const content = await getAboutContent();
		return (
			<article
				className="prose prose-gray dark:prose-invert max-w-none"
				aria-labelledby="about-title"
			>
				<h1
					id="about-title"
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
			</article>
		);
	} catch (error) {
		console.error("Error loading about content:", error);
		return (
			<article
				className="prose prose-gray dark:prose-invert max-w-none"
				aria-labelledby="error-title"
			>
				<h1
					id="error-title"
					className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
				>
					{t.about.title}
				</h1>
				<div
					className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
					role="alert"
					aria-label={t.a11y.errorMessage}
				>
					{t.errors.loadingAbout}
				</div>
			</article>
		);
	}
}
