import Link from "next/link";
import { cn } from "@/lib/utils";

type TagProps = {
	text: string;
	href?: string;
	className?: string;
};

export function Tag({ text, href, className }: TagProps) {
	const baseClass = cn(
		"px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
		className,
	);

	if (href) {
		return (
			<Link href={href} className={baseClass}>
				#{text}
			</Link>
		);
	}

	return <span className={baseClass}>#{text}</span>;
}
