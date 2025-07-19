import type { Metadata } from "next";
import { generateMetadata as generateSiteMetadata } from "@/lib/metadata";
import { generateWebPageSchema, generateItemListSchema } from "@/lib/schema";
import { siteConfig } from "@/siteConfig";
import { getTranslation } from "@/i18n";

const t = getTranslation();

export const metadata: Metadata = generateSiteMetadata({
	title: t.projects.titlePage,
	description: t.projects.descriptionPage,
	path: "/projects",
});

export default async function ProjectsPage() {
	const pageSchema = generateWebPageSchema({
		title: t.projects.title,
		description: t.projects.descriptionPage,
		url: `${siteConfig.url}/projects`,
	});

	const projectsSchema = t.projects.projects && t.projects.projects.length > 0 
		? generateItemListSchema({
			title: t.projects.title,
			description: t.projects.descriptionPage,
			url: `${siteConfig.url}/projects`,
			items: t.projects.projects.map(project => ({
				name: project.title,
				description: project.description,
				technologies: project.technologies,
			})),
		})
		: null;

	try {
		return (
			<>
				<script
					type="application/ld+json"
					suppressHydrationWarning
					// biome-ignore lint/security/noDangerouslySetInnerHtml: Required for structured data
					dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema, null, 2) }}
				/>
				{projectsSchema && (
					<script
						type="application/ld+json"
						suppressHydrationWarning
						// biome-ignore lint/security/noDangerouslySetInnerHtml: Required for structured data
						dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema, null, 2) }}
					/>
				)}
				<div className="py-8 sm:py-12">
					<div className="mb-12">
						<h1 className="text-4xl font-bold text-[#292929] dark:text-[#E6E6E6] mb-4">
							{t.projects.title}
						</h1>
						<p className="text-lg text-[#6B6B6B] dark:text-[#8F8F8F]">
							{t.projects.body}
						</p>
					</div>
					
					{t.projects.projects && t.projects.projects.length > 0 ? (
						<div className="space-y-6">
							{t.projects.projects.map((project) => (
								<div
									className="border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.12)] rounded-lg p-6 hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.02)] transition-colors"
									key={project.title}
								>
									<h2 className="text-xl font-semibold text-[#292929] dark:text-[#E6E6E6] mb-3">
										{project.title}
									</h2>
									<p className="text-[#6B6B6B] dark:text-[#8F8F8F] mb-4">
										{project.description}
									</p>
									<div className="flex flex-wrap gap-2">
										{project.technologies.map((tech) => (
											<span
												key={tech}
												className="text-xs px-2 py-1 bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.08)] text-[#757575] dark:text-[#A8A8A8] rounded-full"
											>
												{tech}
											</span>
										))}
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-[#757575] dark:text-[#A8A8A8]">
							{t.a11y.noProjects}
						</div>
					)}
				</div>
			</>
		);
	} catch (error) {
		console.error("Error loading projects:", error);
		return (
			<div className="py-8 sm:py-12">
				<h1 className="text-4xl font-bold text-[#292929] dark:text-[#E6E6E6] mb-4">
					{t.projects.title}
				</h1>
				<div className="text-lg text-[#6B6B6B] dark:text-[#8F8F8F]">
					{t.errors.loadingProjects}
				</div>
			</div>
		);
	}
}