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
					<div className="mt-12 space-y-12">
						{content.projects.map((project) => (
							<div
								key={project.title}
								className="relative border-b border-gray-200 pb-12 dark:border-gray-800 last:border-0 last:pb-0"
							>
								<div className="flex flex-col gap-4">
									<div className="flex items-start justify-between">
										<div>
											<h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
												{project.title}
											</h3>
											<p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
												{project.description}
											</p>
										</div>
										{project.link && (
											<a
												href={project.link}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
											>
												View Project
												<svg
													className="h-4 w-4"
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
									<div className="flex flex-wrap gap-2">
										{project.technologies.map((tech) => (
											<span
												key={tech}
												className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
											>
												{tech}
											</span>
										))}
									</div>
								</div>
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
