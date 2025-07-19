import type { Metadata } from "next";
import { generateMetadata as generateSiteMetadata } from "@/lib/metadata";
import { generateWebPageSchema } from "@/lib/schema";
import { siteConfig } from "@/siteConfig";
import { dateFormat } from "@/lib/utils";
import { getTranslation } from "@/i18n";

const t = getTranslation();

export const metadata: Metadata = generateSiteMetadata({
	title: "Now",
	description: "What I'm currently focused on",
	path: "/now",
});

export default async function NowPage() {
	const schema = generateWebPageSchema({
		title: "Now",
		description: "What I'm currently focused on",
		url: `${siteConfig.url}/now`,
	});

	return (
		<div className="py-8 sm:py-12">
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
			/>
			<div className="mb-12">
				<h1 className="text-4xl font-bold text-[#292929] dark:text-[#E6E6E6] mb-4">
					Now
				</h1>
				<p className="text-sm text-[#757575] dark:text-[#A8A8A8]">
					Last updated: {dateFormat(t.now.lastUpdated)}
				</p>
			</div>

			<div className="space-y-12">
				{t.now.categories.map((category) => (
					<section key={category.name} className="space-y-6">
						<h2 className="text-2xl font-semibold text-[#292929] dark:text-[#E6E6E6]">
							{category.name}
						</h2>
						<div className="grid gap-4 sm:grid-cols-2">
							{category.items.map((item) => (
								<div
									key={item.title}
									className="rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.12)] bg-[rgba(0,0,0,0.02)] dark:bg-[rgba(255,255,255,0.02)] p-6 hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-[rgba(255,255,255,0.04)] transition-colors"
								>
									<h3 className="font-semibold text-[#292929] dark:text-[#E6E6E6] mb-2">
										{item.title}
									</h3>
									<p className="text-[#6B6B6B] dark:text-[#8F8F8F] mb-3">
										{item.description}
									</p>
									{item.status && (
										<span className="inline-flex items-center rounded-full bg-[#1A8917] dark:bg-[#1DB954] px-3 py-1 text-xs font-medium text-white">
											{item.status}
										</span>
									)}
								</div>
							))}
						</div>
					</section>
				))}
			</div>
		</div>
	);
}