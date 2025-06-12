/* ------------------------------ Types ------------------------------ */

type ClassValue = string | false | null | undefined;

export type Metadata = {
	date?: string | number | Date;
	title: string;
	publishedAt: string;
	summary: string;
	image?: string;
	tags?: string[];
};

export type PostMeta = {
	slug: string;
	title: string;
	date: string;
	summary: string;
	tags: string[];
};

/* -------------------------- Utility functions -------------------------- */

export function classNameJoin(...classes: (string | undefined | null | false)[]) {
	return classes.filter(Boolean).join(" ");
}

/* -------------------------- Date formatting -------------------------- */

export function dateFormat(dateString: string) {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export function dateFormatRelative(date: string, includeRelative = false) {
	const currentDate = new Date();
	let dateStr = date;
	if (!dateStr.includes("T")) {
		dateStr = `${dateStr}T00:00:00`;
	}
	const targetDate = new Date(dateStr);

	const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
	const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
	const daysAgo = currentDate.getDate() - targetDate.getDate();

	let formattedDate = "";

	if (yearsAgo > 0) {
		formattedDate = `${yearsAgo}y ago`;
	} else if (monthsAgo > 0) {
		formattedDate = `${monthsAgo}mo ago`;
	} else if (daysAgo > 0) {
		formattedDate = `${daysAgo}d ago`;
	} else {
		formattedDate = "Today";
	}

	const fullDate = targetDate.toLocaleString("en-us", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

	if (!includeRelative) {
		return fullDate;
	}

	return `${fullDate} (${formattedDate})`;
}

export function formatDate(date: string) {
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}
