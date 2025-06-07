import type { Metadata } from "next";
import { generateMetadata as generateSiteMetadata } from "@/lib/metadata";
import { getTranslation } from "@/i18n";

const t = getTranslation();

export const metadata: Metadata = generateSiteMetadata({
	title: t.projects.titlePage,
	description: t.projects.descriptionPage,
	path: "/projects",
});

export default async function ProjectsPage() {
	try {
		return (
			<article
				className=" -gray dark:-invert max-w-none"
				aria-labelledby="projects-title"
			>
				<h1
					id="projects-title"
					className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
				>
					{t.projects.title}
				</h1>
				<div
					className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
					aria-label={t.a11y.postContent}
				>
					{t.projects.body}
				</div>
				{t.projects.projects && t.projects.projects.length > 0 ? (
					<ul className="mt-8 space-y-8 list-none pl-0 marker:hidden">
						{t.projects.projects.map((project) => (
							<li
								className="marker:hidden rounded-md border border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
								key={project.title}
							>
								<div className="space-y-1">
									<h2 className="text-base font-medium text-gray-900 dark:text-white mb-1">
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
				className="  dark:-invert max-w-none"
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
