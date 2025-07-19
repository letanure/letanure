"use client";

import Link from "next/link";
import { classNameJoin } from "@/lib/utils";

type TagProps = {
	text: string;
	href?: string;
	className?: string;
	count?: number;
};

export function Tag({ text, href, className, count }: TagProps) {
	const baseClass = classNameJoin(
		"inline-flex items-center px-2 py-1 rounded-full text-xs font-normal bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.08)] text-[#757575] dark:text-[#A8A8A8] hover:bg-[rgba(0,0,0,0.08)] dark:hover:bg-[rgba(255,255,255,0.12)] hover:text-[#292929] dark:hover:text-[#E6E6E6] transition-colors",
		className,
	);

	const content = (
		<>
			<span>{text}</span>
			{count !== undefined && (
				<span className="ml-1 text-[#8F8F8F] dark:text-[#6B6B6B]">
					{count}
				</span>
			)}
		</>
	);

	if (href) {
		return (
			<Link href={href} className={baseClass}>
				{content}
			</Link>
		);
	}

	return <span className={baseClass}>{content}</span>;
}