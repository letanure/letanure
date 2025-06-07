import { classNameJoin } from "@/lib/utils";

type TitleProps = {
	title?: string;
	titleId?: string;
	subtitle?: string;
	tag?: "h1" | "h2" | "h3";
	ariaTitle?: string;
	ariaSubtitle?: string;
};

const sizeMap = {
	h1: "text-3xl",
	h2: "text-2xl",
	h3: "text-xl",
};

export function Title({
	title,
	titleId,
	subtitle,
	tag = "h1",
	ariaTitle,
	ariaSubtitle,
}: TitleProps) {
	const Tag = tag;
	const sizeClass = sizeMap[tag];

	return (
		<div className="mb-8">
			{title && (
				<Tag
					id={titleId}
					className={classNameJoin(sizeClass, "font-bold mb-2")}
					aria-label={ariaTitle}
				>
					{title}
				</Tag>
			)}
			{subtitle && (
				<p className="text-lg text-gray-700" aria-label={ariaSubtitle}>
					{subtitle}
				</p>
			)}
		</div>
	);
}
