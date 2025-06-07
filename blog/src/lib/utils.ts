import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

type ClassValue = string | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
	return classes.filter(Boolean).join(" ");
}

export function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

type Metadata = {
	date?: string | number | Date;
	title: string;
	publishedAt: string;
	summary: string;
	image?: string;
	tags?: string[];
};

function parseFrontmatter(fileContent: string) {
	const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
	const match = frontmatterRegex.exec(fileContent);
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const frontMatterBlock = match![1];
	const content = fileContent.replace(frontmatterRegex, "").trim();
	const frontMatterLines = frontMatterBlock.trim().split("\n");
	const metadata: Partial<Metadata> = {};

	// biome-ignore lint/complexity/noForEach: <explanation>
	frontMatterLines.forEach((line) => {
		const [key, ...valueArr] = line.split(": ");
		let value = valueArr.join(": ").trim();
		value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
		const cleanKey = key.trim();

		if (cleanKey === "tags") {
			metadata.tags = value
				.replace(/^\[|\]$/g, "")
				.split(",")
				.map((tag) => tag.trim());
		} else {
			(metadata as Record<string, string>)[cleanKey] = value;
		}
	});

	return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: fs.PathLike) {
	return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: fs.PathOrFileDescriptor) {
	const rawContent = fs.readFileSync(filePath, "utf-8");
	return parseFrontmatter(rawContent);
}

function getMDXData(dir: fs.PathLike) {
	const mdxFiles = getMDXFiles(dir);
	return mdxFiles.map((file) => {
		const { metadata, content } = readMDXFile(path.join(dir as string, file));
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

export function getBlogPosts() {
	const blogRoot = path.join(process.cwd(), ".."); // Go one level up from blog directory
	return getMDXData(path.join(blogRoot, "content", "posts"));
}

export function formatDate2(date: string, includeRelative = false) {
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

const POSTS_PATH = path.join(process.cwd(), "..", "content", "posts");

export type PostMeta = {
	slug: string;
	title: string;
	date: string;
	summary: string;
	tags: string[];
};

export async function getPostSlugs(): Promise<string[]> {
	return fs
		.readdirSync(POSTS_PATH)
		.filter((file) => file.endsWith(".mdx"))
		.map((file) => file.replace(/\.mdx$/, ""));
}

export async function getPostBySlug(slug: string): Promise<{
	meta: PostMeta;
	content: string;
}> {
	const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
	const source = fs.readFileSync(filePath, "utf8");
	const { content, data } = matter(source);
	return {
		meta: {
			slug,
			title: data.title || slug,
			date: data.date || "",
			summary: data.summary || "",
			tags: data.tags || [],
		},
		content,
	};
}

export async function getAllPostsMeta(): Promise<PostMeta[]> {
	const slugs = await getPostSlugs();
	const posts = slugs.map((slug) => {
		const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
		const source = fs.readFileSync(filePath, "utf8");
		const { data } = matter(source);
		return {
			slug,
			title: data.title || slug,
			date: data.date || "",
			summary: data.summary || "",
			tags: data.tags || [],
		};
	});
	// Sort by date descending
	return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getAllTags(): Promise<string[]> {
	const posts = await getAllPostsMeta();
	const tags = new Set(posts.flatMap((post) => post.tags));
	return Array.from(tags).sort();
}

export async function getPostsByTag(tag: string): Promise<PostMeta[]> {
	const posts = await getAllPostsMeta();
	return posts.filter((post) => post.tags.includes(tag));
}
