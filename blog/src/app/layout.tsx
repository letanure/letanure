import "./globals.css";
import { defaultMetadata } from "./metadata";
import Link from "next/link";

export const metadata = defaultMetadata;

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-white text-gray-900 min-h-screen">
				<header className="border-b">
					<nav className="max-w-2xl mx-auto p-4">
						<ul className="flex gap-4">
							<li>
								<Link href="/" className="hover:underline">
									Home
								</Link>
							</li>
							<li>
								<Link href="/blog" className="hover:underline">
									Blog
								</Link>
							</li>
							<li>
								<Link href="/about" className="hover:underline">
									About
								</Link>
							</li>
							<li>
								<Link href="/now" className="hover:underline">
									Now
								</Link>
							</li>
							<li>
								<Link href="/projects" className="hover:underline">
									Projects
								</Link>
							</li>
						</ul>
					</nav>
				</header>
				<main className="p-4">{children}</main>
			</body>
		</html>
	);
}
