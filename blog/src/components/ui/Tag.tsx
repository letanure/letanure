"use client";

import Link from "next/link";
import { classNameJoin } from "@/lib/utils";

type TagProps = {
	text: string;
	href?: string;
	className?: string;
};

export function Tag({ text, href, className }: TagProps) {
	const baseClass = classNameJoin(
		"inline-flex items-center px-[9px] py-0.5 rounded-[11px] text-[12px] font-normal bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
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
