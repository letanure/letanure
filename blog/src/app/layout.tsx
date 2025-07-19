import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { defaultMetadata } from "./metadata";
import SkipNavigation from "@/components/SkipNavigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import { Umami } from "@/components/Umami";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = defaultMetadata;

export const metadata: Metadata = {
	title: "Luiz Tanure",
	description: "A personal blog about web development, programming, and technology.",
	alternates: {
		types: {
			'application/rss+xml': [
				{ url: '/feed.xml', title: 'Letanure Blog RSS Feed' }
			]
		}
	}
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="h-full">
			<Analytics />
			<SpeedInsights />
			<body className={`${inter.className} h-full bg-white dark:bg-[#191919]`}>
				<SkipNavigation />
				<Menu />
				<main
					id="main-content"
					className="mx-auto max-w-[1000px] px-4 pt-24 pb-16 sm:px-6 lg:px-8"
				>
					{children}
				</main>
				<Footer />
				<Umami />
			</body>
		</html>
	);
}
