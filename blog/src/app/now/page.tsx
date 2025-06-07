import type { Metadata } from "next";
import { generateMetadata as generateSiteMetadata } from "@/lib/metadata";
import { generateWebPageSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { dateFormat } from "@/lib/utils";
import type { NowContent, NowCategory } from "@/types/content";

export const metadata: Metadata = generateSiteMetadata({
	title: "Now",
	description: "What I'm currently focused on",
	path: "/now",
});

async function getNowContent(): Promise<NowContent> {
	const filePath = join(process.cwd(), "src", "content", "json", "now.en.json");
	const content = await readFile(filePath, "utf-8");
	return JSON.parse(content);
}

export default async function NowPage() {
	const content = await getNowContent();
	const { categories, lastUpdated } = content;

	const schema = generateWebPageSchema({
		title: "Now",
		description: "What I'm currently focused on",
		url: `${siteConfig.url}/now`,
	});

	return (
		<article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
			/>
			<header className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
					Now
				</h1>
				<p className="mt-4 text-sm text-gray-500">
					Last updated: {dateFormat(lastUpdated)}
				</p>
			</header>

			<div className="space-y-12">
				{categories.map((category: NowCategory) => (
					<section key={category.name} className="space-y-4">
						<h2 className="text-xl font-semibold text-gray-900">
							{category.name}
						</h2>
						<div className="grid gap-4 sm:grid-cols-2">
							{category.items.map((item) => (
								<div
									key={item.title}
									className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
								>
									<h3 className="font-medium text-gray-900">{item.title}</h3>
									<p className="mt-1 text-sm text-gray-600">
										{item.description}
									</p>
									{item.status && (
										<span className="mt-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
											{item.status}
										</span>
									)}
								</div>
							))}
						</div>
					</section>
				))}
			</div>
		</article>
	);
}
