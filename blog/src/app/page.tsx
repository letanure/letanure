import PostsList from "@/components/PostsList";
import { getTranslation } from "@/i18n";
import { generateWebSiteSchema } from "@/lib/schema";

const t = getTranslation();

export default async function HomePage() {
	const schema = generateWebSiteSchema();

	return (
		<>
			<script
				type="application/ld+json"
				suppressHydrationWarning
				// biome-ignore lint/security/noDangerouslySetInnerHtml: Required for structured data
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
			/>
			<div className="py-8 sm:py-12">
				<section className="mb-16">
					<h1 className="text-4xl sm:text-5xl font-bold text-[#292929] dark:text-[#E6E6E6] mb-6 leading-tight">
						{t.home.title}
					</h1>
					<p className="text-xl text-[#6B6B6B] dark:text-[#8F8F8F] leading-relaxed">
						{t.home.subtitle}
					</p>
				</section>
				
				<section>
					<h2 className="text-2xl font-semibold text-[#292929] dark:text-[#E6E6E6] mb-8">
						{t.home.latestPosts}
					</h2>
					<PostsList limit={5} />
				</section>
			</div>
		</>
	);
}