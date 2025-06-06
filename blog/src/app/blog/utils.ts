import fs from "node:fs";
import path from "node:path";

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

export function formatDate(date: string, includeRelative = false) {
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
