import { Title } from "@/components/ui/Title";
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
			<section className="max-w-2xl mx-auto">
				<Title title={t.home.title} subtitle={t.home.subtitle} tag="h1" />
				<div>
					<Title title={t.home.latestPosts} tag="h2" />
					<PostsList limit={3} />
				</div>
			</section>
		</>
	);
}
