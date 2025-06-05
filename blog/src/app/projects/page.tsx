import type { Metadata } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import { generateMetadata as generateSiteMetadata } from "@/app/metadata";
import { getTranslation } from "@/i18n";
import type { ProjectsContent, Project } from "@/types/content";

const t = getTranslation();

export const metadata: Metadata = generateSiteMetadata({
	title: t.projects.title,
	description: t.projects.description,
	path: "/projects",
});

async function getProjectsContent(locale = "en"): Promise<ProjectsContent> {
	const filePath = path.join(
		process.cwd(),
		`src/content/json/projects.${locale}.json`,
	);
	const data = await fs.readFile(filePath, "utf8");
	const content = JSON.parse(data);

	// Validate the content structure
	if (!content || typeof content !== "object") {
		throw new Error("Invalid projects content: content must be an object");
	}

	if (!content.title || typeof content.title !== "string") {
		throw new Error("Invalid projects content: title must be a string");
	}

	if (!content.body || typeof content.body !== "string") {
		throw new Error("Invalid projects content: body must be a string");
	}

	if (!Array.isArray(content.projects)) {
		throw new Error("Invalid projects content: projects must be an array");
	}

	// Validate each project
	content.projects.forEach((project: Partial<Project>, index: number) => {
		if (!project.title || typeof project.title !== "string") {
			throw new Error(
				`Invalid project at index ${index}: title must be a string`,
			);
		}
		if (!project.description || typeof project.description !== "string") {
			throw new Error(
				`Invalid project at index ${index}: description must be a string`,
			);
		}
		if (!Array.isArray(project.technologies)) {
			throw new Error(
				`Invalid project at index ${index}: technologies must be an array`,
			);
		}
	});

	return content as ProjectsContent;
}

export default async function ProjectsPage() {
	try {
		const content = await getProjectsContent();
		return (
			<article className="prose prose-gray dark:prose-invert max-w-none">
				<h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
					{content.title}
				</h1>
				<div className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					{content.body}
				</div>
				{content.projects && content.projects.length > 0 ? (
					<div className="mt-12 grid gap-8 sm:grid-cols-2">
						{content.projects.map((project) => (
							<div
								key={project.title}
								className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
							>
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
									{project.title}
								</h3>
								<p className="mt-2 text-gray-600 dark:text-gray-300">
									{project.description}
								</p>
								<div className="mt-4 flex flex-wrap gap-2">
									{project.technologies.map((tech) => (
										<span
											key={tech}
											className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200"
										>
											{tech}
										</span>
									))}
								</div>
								{project.link && (
									<a
										href={project.link}
										target="_blank"
										rel="noopener noreferrer"
										className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
									>
										View Project
										<svg
											className="ml-1 h-4 w-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											aria-hidden="true"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
											/>
										</svg>
									</a>
								)}
							</div>
						))}
					</div>
				) : (
					<div className="mt-8 text-gray-600 dark:text-gray-400">
						No projects available at the moment.
					</div>
				)}
			</article>
		);
	} catch (error) {
		console.error("Error loading projects:", error);
		return (
			<article className="prose prose-gray dark:prose-invert max-w-none">
				<h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
					{t.projects.title}
				</h1>
				<div className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					Sorry, there was an error loading the projects. Please try again
					later.
				</div>
			</article>
		);
	}
}
