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
			
			{/* Hero Section */}
			<div className="mb-16">
				<div className="flex items-center gap-3 mb-6">
					<div className="w-3 h-3 bg-[#1A8917] dark:bg-[#1DB954] rounded-full animate-pulse"></div>
					<h1 className="text-4xl sm:text-5xl font-bold text-[#292929] dark:text-[#E6E6E6] leading-tight">
						What I'm doing now
					</h1>
				</div>
				<p className="text-lg text-[#6B6B6B] dark:text-[#8F8F8F] mb-4 max-w-2xl">
					A snapshot of my current focus areas, projects, and interests. Inspired by the{" "}
					<a 
						href="https://nownownow.com/about" 
						target="_blank" 
						rel="noopener noreferrer"
						className="text-[#1A8917] dark:text-[#1DB954] underline underline-offset-2 hover:no-underline transition-all"
					>
						/now movement
					</a>.
				</p>
				<div className="flex items-center gap-2 text-sm text-[#757575] dark:text-[#A8A8A8]">
					<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span>Last updated: {dateFormat(t.now.lastUpdated)}</span>
				</div>
			</div>

			{/* Grid Layout */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-8 space-y-12">
					{t.now.categories.map((category, categoryIndex) => (
						<section key={category.name} className="group">
							<div className="flex items-center gap-3 mb-6">
								<div className={`w-2 h-8 rounded-full ${
									categoryIndex === 0 ? 'bg-[#1A8917] dark:bg-[#1DB954]' :
									categoryIndex === 1 ? 'bg-[#6366f1] dark:bg-[#8b5cf6]' :
									categoryIndex === 2 ? 'bg-[#06b6d4] dark:bg-[#0891b2]' :
									'bg-[#f59e0b] dark:bg-[#d97706]'
								}`}></div>
								<h2 className="text-2xl font-semibold text-[#292929] dark:text-[#E6E6E6]">
									{category.name}
								</h2>
							</div>
							
							<div className="grid gap-4 lg:grid-cols-1 xl:grid-cols-2">
								{category.items.map((item, itemIndex) => (
									<div
										key={item.title}
										className="group/item relative"
										style={{ animationDelay: `${itemIndex * 100}ms` }}
									>
										<div className="h-full p-6 rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.12)] bg-[rgba(0,0,0,0.01)] dark:bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(0,0,0,0.12)] dark:hover:border-[rgba(255,255,255,0.2)] transition-all duration-300 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 flex flex-col">
											<h3 className="font-semibold text-[#292929] dark:text-[#E6E6E6] mb-3 text-lg">
												{item.title}
											</h3>
											
											<p className="text-[#6B6B6B] dark:text-[#8F8F8F] leading-relaxed flex-1 mb-4">
												{item.description}
											</p>
											
											{/* Status Indicator at bottom */}
											{item.status && (
												<div className="flex justify-start">
													<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#1A8917] dark:bg-[#1DB954] text-white">
														<div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
														{item.status}
													</span>
												</div>
											)}
											
											{/* Hover Effect */}
											<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#6366f1]/0 via-[#6366f1]/0 to-[#8b5cf6]/0 group-hover/item:from-[#6366f1]/[0.02] group-hover/item:via-[#6366f1]/[0.01] group-hover/item:to-[#8b5cf6]/[0.02] transition-all duration-500 pointer-events-none"></div>
										</div>
									</div>
								))}
							</div>
						</section>
					))}
				</div>
				
				{/* Sidebar */}
				<aside className="lg:col-span-4 lg:pt-[54px]">
					<div className="sticky top-24 space-y-8">
						{/* Quick Stats */}
						<div className="p-5 rounded-lg bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.05)] border-l-4 border-[#1A8917] dark:border-[#1DB954]">
							<h3 className="font-semibold text-[#292929] dark:text-[#E6E6E6] mb-4 flex items-center gap-2">
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
								</svg>
								Quick Overview
							</h3>
							<div className="space-y-3">
								{t.now.categories.map((category) => (
									<div key={category.name} className="flex justify-between items-center">
										<span className="text-[#6B6B6B] dark:text-[#8F8F8F] text-sm">{category.name}</span>
										<span className="text-[#292929] dark:text-[#E6E6E6] font-medium text-sm">{category.items.length} items</span>
									</div>
								))}
							</div>
						</div>
						
						{/* About This Page */}
						<div className="p-5 rounded-lg bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.05)] border-l-4 border-[#6366f1] dark:border-[#8b5cf6]">
							<h3 className="font-semibold text-[#292929] dark:text-[#E6E6E6] mb-3 flex items-center gap-2">
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								About This Page
							</h3>
							<p className="text-[#6B6B6B] dark:text-[#8F8F8F] text-sm leading-relaxed">
								This page follows the "now" page concept created by Derek Sivers. It's a living document that shows what I'm focused on right now, updated regularly to reflect my current priorities and projects.
							</p>
						</div>
					</div>
				</aside>
			</div>
		</div>
	);
}