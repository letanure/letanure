// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { defaultMetadata } from "./metadata";
import SkipNavigation from "@/components/SkipNavigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="h-full">
			<Analytics />
			<SpeedInsights />
			<body className={`${inter.className} h-full bg-gray-50 dark:bg-gray-900`}>
				<SkipNavigation />
				<Menu />
				<main
					id="main-content"
					className="mx-auto max-w-7xl px-4 pt-24 pb-8 sm:px-6 lg:px-8"
				>
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
}
