import { Tag } from "@/components/ui/Tag";
import { classNameJoin } from "@/lib/utils";

interface TagListProps {
	tags: string[];
	as?: "nav" | "div" | "ul" | "ol";
	className?: string;
	showCount?: boolean;
}

export function TagList({
	tags,
	as = "div",
	className,
	showCount = false,
}: TagListProps) {
	// Count occurrences of each tag
	const tagCounts = tags.reduce<Record<string, number>>((acc, tag) => {
		acc[tag] = (acc[tag] || 0) + 1;
		return acc;
	}, {});

	// Sort tags by count, descending
	const sortedTags = Object.entries(tagCounts).sort(([, a], [, b]) => b - a);

	// Define the container element
	const Container = as;

	return (
		<Container className={classNameJoin("flex flex-wrap gap-2", className)}>
			{sortedTags.map(([tag, count]) => {
				const tagLabel = showCount ? `${tag} (${count})` : tag;
				const tagUrl = tag.toLowerCase().replace(/\s+/g, '-');

				if (as === "nav") {
					return (
						<Tag
							key={tag}
							text={tagLabel}
							href={`/blog/tag/${tagUrl}`}
							aria-label={`Posts tagged with ${tag}`}
						/>
					);
				}

				if (as === "ul" || as === "ol") {
					return (
						<li key={tag}>
							<Tag text={tagLabel} aria-label={`Posts tagged with ${tag}`} />
						</li>
					);
				}

				return (
					<Tag
						key={tag}
						text={tagLabel}
						aria-label={`Posts tagged with ${tag}`}
					/>
				);
			})}
		</Container>
	);
}
