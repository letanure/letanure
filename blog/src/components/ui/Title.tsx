import { cn } from "@/lib/utils";

type TitleProps = {
	title?: string;
	subtitle?: string;
	tag?: "h1" | "h2" | "h3";
};

const sizeMap = {
	h1: "text-3xl",
	h2: "text-2xl",
	h3: "text-xl",
};

export function Title({ title, subtitle, tag = "h1" }: TitleProps) {
	const Tag = tag;
	const sizeClass = sizeMap[tag];

	return (
		<div className="mb-8">
			{title && <Tag className={cn(sizeClass, "font-bold mb-2")}>{title}</Tag>}
			{subtitle && <p className="text-lg text-gray-700">{subtitle}</p>}
		</div>
	);
}
