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
				<div className="py-8 sm:py-12">
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
							<h1 className="text-4xl sm:text-5xl font-bold text-[#292929] dark:text-[#E6E6E6] mb-4 leading-tight">
								{t.about.title}
							</h1>
							<p className="text-xl text-[#6B6B6B] dark:text-[#8F8F8F] mb-4">
								{t.about.subtitle}
							</p>
							<p className="text-lg text-[#757575] dark:text-[#A8A8A8]">
								{t.about.hero.brief}
							</p>
						</div>
					</div>

					{/* Skills Section */}
					<section className="mb-16">
						<h2 className="text-2xl font-semibold text-[#292929] dark:text-[#E6E6E6] mb-8">
							Skills & Technologies
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{t.about.skills.categories.map((category) => (
								<div
									key={category.name}
									className="bg-[rgba(0,0,0,0.02)] dark:bg-[rgba(255,255,255,0.05)] rounded-lg p-6 border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.12)]"
								>
									<h3 className="text-lg font-semibold text-[#292929] dark:text-[#E6E6E6] mb-4">
										{category.name}
									</h3>
									<ul className="space-y-2">
										{category.items.map((item) => (
											<li
												key={item}
												className="text-[#6B6B6B] dark:text-[#8F8F8F]"
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
						<h2 className="text-2xl font-semibold text-[#292929] dark:text-[#E6E6E6] mb-8">
							Experience
						</h2>
						<div className="space-y-8">
							{t.about.experience.map((job) => (
								<div
									key={`${job.company}-${job.period}`}
									className="relative pl-8 border-l-2 border-[rgba(0,0,0,0.12)] dark:border-[rgba(255,255,255,0.15)]"
								>
									<div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#1A8917] dark:bg-[#1DB954]" />
									<h3 className="text-lg font-semibold text-[#292929] dark:text-[#E6E6E6]">
										{job.title}
									</h3>
									<p className="text-[#757575] dark:text-[#A8A8A8]">
										{job.company} • {job.period}
									</p>
									<p className="mt-2 text-[#6B6B6B] dark:text-[#8F8F8F]">
										{job.description}
									</p>
								</div>
							))}
						</div>
					</section>

					{/* Interests Section */}
					<section className="mb-16">
						<h2 className="text-2xl font-semibold text-[#292929] dark:text-[#E6E6E6] mb-8">
							Interests & Hobbies
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{t.about.interests.map((interest) => (
								<div
									key={interest.title}
									className="bg-[rgba(0,0,0,0.02)] dark:bg-[rgba(255,255,255,0.05)] rounded-lg p-6 border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.12)]"
								>
									<h3 className="text-lg font-semibold text-[#292929] dark:text-[#E6E6E6] mb-2">
										{interest.title}
									</h3>
									<p className="text-[#6B6B6B] dark:text-[#8F8F8F]">
										{interest.description}
									</p>
								</div>
							))}
						</div>
					</section>

					{/* Contact Section */}
					<section>
						<h2 className="text-2xl font-semibold text-[#292929] dark:text-[#E6E6E6] mb-8">
							Get in Touch
						</h2>
						<div className="bg-[rgba(0,0,0,0.02)] dark:bg-[rgba(255,255,255,0.05)] rounded-lg p-6 border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.12)]">
							<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
								<div>
									<p className="text-[#6B6B6B] dark:text-[#8F8F8F]">
										{t.about.contact.location}
									</p>
									<a
										href={`mailto:${t.about.contact.email}`}
										className="text-[#292929] dark:text-[#E6E6E6] underline underline-offset-4 decoration-[#757575] hover:decoration-[#292929] dark:hover:decoration-[#E6E6E6] transition-colors"
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
											className="text-[#757575] hover:text-[#292929] dark:text-[#A8A8A8] dark:hover:text-[#E6E6E6] transition-colors"
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
				className="py-8 sm:py-12"
				aria-labelledby="error-title"
			>
				<h1
					id="error-title"
					className="text-4xl font-bold text-[#292929] dark:text-[#E6E6E6] mb-4"
				>
					{t.about.title}
				</h1>
				<div
					className="text-lg text-[#6B6B6B] dark:text-[#8F8F8F]"
					role="alert"
					aria-label={t.a11y.errorMessage}
				>
					{t.errors.loadingAbout}
				</div>
			</article>
		);
	}
}