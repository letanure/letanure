import type { Metadata } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import { generateMetadata as generateSiteMetadata } from "@/app/metadata";
import { getTranslation } from "@/i18n";
import type { NowContent } from "@/types/content";

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
	return JSON.parse(data);
}

export default async function NowPage() {
	const content = await getNowContent();
	return (
		<article className="prose prose-gray dark:prose-invert max-w-none">
			<h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
				{content.title}
			</h1>
			<div className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				{content.body}
			</div>
			<div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
				Last updated: {content.lastUpdated}
			</div>
		</article>
	);
}
