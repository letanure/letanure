import Link from "next/link";
import { getTranslation } from "@/i18n";

const t = getTranslation();

export default function Menu() {
	return (
		<header className="bg-white shadow-sm dark:bg-gray-800">
			<nav
				className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
				aria-label="Main navigation"
			>
				<div className="flex h-16 justify-between">
					<div className="flex">
						<div className="flex flex-shrink-0 items-center">
							<Link
								href="/"
								className="text-xl font-bold text-gray-900 dark:text-white"
							>
								{t.site.name}
							</Link>
						</div>
						<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
							<Link
								href="/"
								className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
							>
								{t.nav.home}
							</Link>
							<Link
								href="/blog"
								className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
							>
								{t.nav.blog}
							</Link>
							<Link
								href="/about"
								className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
							>
								{t.nav.about}
							</Link>
							<Link
								href="/now"
								className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
							>
								{t.nav.now}
							</Link>
							<Link
								href="/projects"
								className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
							>
								{t.nav.projects}
							</Link>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
}
