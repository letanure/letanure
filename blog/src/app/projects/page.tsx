import type { Metadata } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import { generateMetadata as generateSiteMetadata } from "@/app/metadata";

export const metadata: Metadata = generateSiteMetadata({
	title: "Projects",
	description:
		"Explore my current and past projects in web development and technology.",
	path: "/projects",
});

async function getProjectsContent(locale = "en") {
	const filePath = path.join(
		process.cwd(),
		`src/content/json/projects.${locale}.json`,
	);
	const data = await fs.readFile(filePath, "utf8");
	return JSON.parse(data);
}

export default async function ProjectsPage() {
	const content = await getProjectsContent();
	return (
		<section className="max-w-2xl mx-auto">
			<h1 className="text-3xl font-bold mb-4">{content.title}</h1>
			<p className="text-lg text-gray-700">{content.body}</p>
		</section>
	);
}
