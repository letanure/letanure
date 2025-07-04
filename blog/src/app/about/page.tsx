import type { Metadata } from "next";
import Image from "next/image";
import { generateMetadata as generateSiteMetadata } from "@/lib/metadata";
import { getTranslation } from "@/i18n";
import { generateWebPageSchema, generatePersonSchema } from "@/lib/schema";
import { siteConfig } from "@/siteConfig";

const t = getTranslation();

export const metadata: Metadata = generateSiteMetadata({
	title: t.about.titlePage,
	description: t.about.descriptionPage,
	path: "/about",
});

export default async function AboutPage() {
	try {
		const aboutUrl = `${siteConfig.url}/about`;
		const pageSchema = generateWebPageSchema({
			title: t.about.title,
			description: t.about.descriptionPage,
			url: aboutUrl,
		});
		const personSchema = generatePersonSchema();

		return (
			<>
				<script
					type="application/ld+json"
					suppressHydrationWarning
					{...{ __html: JSON.stringify(pageSchema) }}
				/>
				<script
					type="application/ld+json"
					suppressHydrationWarning
					{...{ __html: JSON.stringify(personSchema) }}
				/>
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					{/* Hero Section */}
					<div className="flex flex-col md:flex-row items-center gap-8 mb-16">
						<div className="relative w-48 h-48 rounded-full overflow-hidden">
							<Image
								src={t.about.hero.image}
								alt={t.about.hero.alt}
								fill
								className="object-cover"
								priority
							/>
						</div>
						<div className="flex-1">
							<h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
								{t.about.title}
							</h1>
							<p className="mt-2 text-xl text-gray-600 dark:text-gray-300">
								{t.about.subtitle}
							</p>
							<p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
								{t.about.hero.brief}
							</p>
						</div>
					</div>

					{/* Skills Section */}
					<section className="mb-16">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
							Skills & Technologies
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{t.about.skills.categories.map((category) => (
								<div
									key={category.name}
									className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
								>
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
										{category.name}
									</h3>
									<ul className="space-y-2">
										{category.items.map((item) => (
											<li
												key={item}
												className="text-gray-600 dark:text-gray-300"
											>
												{item}
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</section>

					{/* Experience Section */}
					<section className="mb-16">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
							Experience
						</h2>
						<div className="space-y-8">
							{t.about.experience.map((job) => (
								<div
									key={`${job.company}-${job.period}`}
									className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700"
								>
									<div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500" />
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
										{job.title}
									</h3>
									<p className="text-gray-600 dark:text-gray-300">
										{job.company} • {job.period}
									</p>
									<p className="mt-2 text-gray-600 dark:text-gray-300">
										{job.description}
									</p>
								</div>
							))}
						</div>
					</section>

					{/* Interests Section */}
					<section className="mb-16">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
							Interests & Hobbies
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{t.about.interests.map((interest) => (
								<div
									key={interest.title}
									className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
								>
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
										{interest.title}
									</h3>
									<p className="text-gray-600 dark:text-gray-300">
										{interest.description}
									</p>
								</div>
							))}
						</div>
					</section>

					{/* Contact Section */}
					<section>
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
							Get in Touch
						</h2>
						<div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
							<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
								<div>
									<p className="text-gray-600 dark:text-gray-300">
										{t.about.contact.location}
									</p>
									<a
										href={`mailto:${t.about.contact.email}`}
										className="text-blue-600 dark:text-blue-400 hover:underline"
									>
										{t.about.contact.email}
									</a>
								</div>
								<div className="flex gap-4">
									{t.about.contact.social.map((link) => (
										<a
											key={link.name}
											href={link.url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
											aria-label={`Visit my ${link.name} profile`}
										>
											<span className="sr-only">{link.name}</span>
											{/* You can add icons here */}
										</a>
									))}
								</div>
							</div>
						</div>
					</section>
				</div>
			</>
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
