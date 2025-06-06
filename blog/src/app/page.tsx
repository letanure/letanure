import { Title } from "@/components/ui/Title";
import LatestPosts from "@/components/LatestPosts";

import { getTranslation } from "@/i18n";

const t = getTranslation();

export default async function HomePage() {
	return (
		<section className="max-w-2xl mx-auto">
			<Title title={t.home.title} subtitle={t.home.subtitle} tag="h1" />

			<div>
				<Title title={t.home.latestPosts} tag="h2" />
				<LatestPosts />
			</div>
		</section>
	);
}
