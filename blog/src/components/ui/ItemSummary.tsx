import Link from "next/link";
import { classNameJoin, dateFormat } from "@/lib/utils";
import { TagList } from "@/components/ui/TagList";

export type ItemSummaryProps = {
	slug?: string;
	title?: string;
	date?: string;
	summary?: string;
	tags?: string[];
	as?: "div" | "li" | "header";
	className?: string;
	hasBorder?: boolean;
	isLink?: boolean;
	showTags?: boolean;
};

export function ItemSummary({
	slug,
	title,
	date,
	summary,
	tags,
	as: Component = "div",
	className,
	hasBorder = true,
	showTags = true,
	isLink = true,
}: ItemSummaryProps) {
	return (
		<Component
			className={classNameJoin(hasBorder && "border-b pb-4", className)}
		>
			{slug && title && isLink ? (
				<Link
					href={`/blog/${slug}`}
					className="text-xl font-semibold hover:underline"
				>
					{title}
				</Link>
			) : (
				title && <p className="text-xl font-semibold">{title}</p>
			)}

			{date && <p className="text-gray-500 text-sm">{dateFormat(date)}</p>}

			{summary && <p className="mt-1 text-gray-700 dark:text-gray-300">{summary}</p>}

			{showTags && tags && tags.length > 0 && (
				<TagList as="nav" tags={tags} className="mt-2" />
			)}
		</Component>
	);
}
