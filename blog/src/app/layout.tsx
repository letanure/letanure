import "./globals.css";
import { defaultMetadata } from "./metadata";
import Link from "next/link";
import { getTranslation } from "@/i18n";

const t = getTranslation();

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
									{t.nav.home}
								</Link>
							</li>
							<li>
								<Link href="/blog" className="hover:underline">
									{t.nav.blog}
								</Link>
							</li>
							<li>
								<Link href="/about" className="hover:underline">
									{t.nav.about}
								</Link>
							</li>
							<li>
								<Link href="/now" className="hover:underline">
									{t.nav.now}
								</Link>
							</li>
							<li>
								<Link href="/projects" className="hover:underline">
									{t.nav.projects}
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
