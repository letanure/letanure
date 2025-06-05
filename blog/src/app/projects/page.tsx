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
			<article
				className="prose prose-gray dark:prose-invert max-w-none"
				aria-labelledby="projects-title"
			>
				<h1
					id="projects-title"
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
				{content.projects && content.projects.length > 0 ? (
					<ul className="mt-8 space-y-8 list-none">
						{content.projects.map((project) => (
							<li
								key={project.title}
								className="border-b border-gray-200 dark:border-gray-800 pb-8 last:border-0"
							>
								<div className="space-y-4">
									<h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
										{project.title}
									</h2>
									<p className="text-gray-600 dark:text-gray-300">
										{project.description}
									</p>
									<ul
										className="flex flex-wrap gap-2 list-none"
										aria-label={`${t.a11y.technologiesUsed.replace("{project}", project.title)}`}
									>
										{project.technologies.map((tech) => (
											<li
												key={tech}
												className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
											>
												{tech}
											</li>
										))}
									</ul>
								</div>
							</li>
						))}
					</ul>
				) : (
					<output
						className="mt-8 text-gray-600 dark:text-gray-400 block"
						aria-label={t.a11y.noProjects}
					>
						{t.a11y.noProjects}
					</output>
				)}
			</article>
		);
	} catch (error) {
		console.error("Error loading projects:", error);
		return (
			<article
				className="prose prose-gray dark:prose-invert max-w-none"
				aria-labelledby="error-title"
			>
				<h1
					id="error-title"
					className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
				>
					{t.projects.title}
				</h1>
				<div
					className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
					role="alert"
					aria-label={t.a11y.errorMessage}
				>
					{t.errors.loadingProjects}
				</div>
			</article>
		);
	}
}
