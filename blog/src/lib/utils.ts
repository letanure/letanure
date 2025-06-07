import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/* ------------------------------ Types ------------------------------ */

type ClassValue = string | false | null | undefined;

type Metadata = {
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

export function classNameJoin(...classes: ClassValue[]): string {
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

/* -------------------------- Frontmatter parsing -------------------------- */

function frontmatterParse(content: string): {
	metadata: Metadata;
	content: string;
} {
	const { data, content: markdown } = matter(content);
	return {
		metadata: data as Metadata,
		content: markdown.trim(),
	};
}

/* -------------------------- MDX file handling -------------------------- */

function mdxFileList(dir: fs.PathLike) {
	return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function mdxFileRead(filePath: fs.PathOrFileDescriptor) {
	const rawContent = fs.readFileSync(filePath, "utf-8");
	return frontmatterParse(rawContent);
}

function mdxFileGetData(dir: fs.PathLike) {
	const mdxFiles = mdxFileList(dir);
	return mdxFiles.map((file) => {
		const { metadata, content } = mdxFileRead(path.join(dir as string, file));
		if (typeof metadata.tags === "string") {
			try {
				metadata.tags = JSON.parse(metadata.tags);
			} catch {
				metadata.tags = [];
			}
		}

		const slug = path.basename(file, path.extname(file));

		return {
			metadata,
			slug,
			content,
		};
	});
}

/* -------------------------- Blog/Post data functions -------------------------- */

const POSTS_PATH = path.join(process.cwd(), "..", "content", "posts");

export async function postSlugsGet(): Promise<string[]> {
	return fs
		.readdirSync(POSTS_PATH)
		.filter((file) => file.endsWith(".mdx"))
		.map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Utility function to read and parse a post file to extract metadata and content.
 * This can be reused to reduce duplication in getPostBySlug and getAllPostsMeta.
 */
function postFileRead(filePath: string) {
	const rawContent = fs.readFileSync(filePath, "utf8");
	// Use parseFrontmatter instead of gray-matter to keep consistency and reduce dependency on gray-matter
	const { metadata, content } = frontmatterParse(rawContent);
	// Ensure tags is always an array
	if (typeof metadata.tags === "string") {
		try {
			metadata.tags = JSON.parse(metadata.tags);
		} catch {
			metadata.tags = [];
		}
	}
	return { metadata, content };
}

/**
 * Note: getPostBySlug and getAllPostsMeta share duplicated logic for reading files,
 * parsing frontmatter, and extracting metadata. Consider merging or reusing the logic
 * via a utility function such as readPostFile to reduce redundancy.
 */
export async function postBySlugGet(slug: string): Promise<{
	meta: PostMeta;
	content: string;
}> {
	const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
	// Using readPostFile to parse frontmatter and content
	const { metadata, content } = postFileRead(filePath);
	return {
		meta: {
			slug,
			title: metadata.title || slug,
			date: String(metadata.date || ""),
			summary: metadata.summary || "",
			tags: metadata.tags || [],
		},
		content,
	};
}

/**
 * getAllPostsMeta also duplicates logic of reading files and parsing metadata.
 * Using readPostFile here to reduce duplication.
 */
export async function postMetaAllGet(): Promise<PostMeta[]> {
	const slugs = await postSlugsGet();
	const posts = slugs.map((slug) => {
		const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
		const { metadata } = postFileRead(filePath);
		return {
			slug,
			title: metadata.title || slug,
			date: String(metadata.date || ""),
			summary: metadata.summary || "",
			tags: metadata.tags || [],
		};
	});
	// Sort by date descending
	return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function postTagsAllGet(): Promise<string[]> {
	const posts = await postMetaAllGet();
	const tags = new Set(posts.flatMap((post) => post.tags));
	return Array.from(tags).sort();
}

export async function postByTagGet(tag: string): Promise<PostMeta[]> {
	const posts = await postMetaAllGet();
	return posts.filter((post) => post.tags.includes(tag));
}

export function postAllGet() {
	const blogRoot = path.join(process.cwd(), ".."); // Go one level up from blog directory
	return mdxFileGetData(path.join(blogRoot, "content", "posts"));
}
