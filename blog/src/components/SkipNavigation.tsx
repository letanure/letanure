import { getTranslation } from "@/i18n";

const t = getTranslation();

export default function SkipNavigation() {
	return (
		<a
			href="#main-content"
			className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-gray-900 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:bg-gray-900 dark:focus:text-white"
		>
			{t.a11y.skipToContent}
		</a>
	);
}
