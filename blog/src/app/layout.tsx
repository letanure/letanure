import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "My Blog",
	description: "A personal blog built with Next.js 14",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-white text-gray-900 min-h-screen">
				<header className="py-6 px-4 border-b">
					<nav className="max-w-3xl mx-auto flex justify-between items-center">
						<a href="/" className="font-bold text-xl">
							My Blog
						</a>
						<div className="space-x-4">
							<a href="/blog" className="hover:underline">
								Blog
							</a>
							<a href="/about" className="hover:underline">
								About
							</a>
							<a href="/now" className="hover:underline">
								Now
							</a>
							<a href="/projects" className="hover:underline">
								Projects
							</a>
						</div>
					</nav>
				</header>
				<main className="max-w-3xl mx-auto px-4 py-8">{children}</main>
			</body>
		</html>
	);
}
