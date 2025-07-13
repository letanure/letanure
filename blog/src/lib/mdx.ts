import matter from "gray-matter";
// import type { Metadata, PostMeta } from "./utils";
import fs from "node:fs";
import path from "node:path";
import type { PostMetadata } from "@/types/post";

const POSTS_PATH = path.join(process.cwd(), "content", "posts");

export function postMetadataGet(slug: string): PostMetadata {
	const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
	const rawContent = fs.readFileSync(filePath, "utf8");
	const { data, content } = matter(rawContent);

	return {
		slug,
		title: data.title,
		date: data.date,
		summary: data.summary,
		tags: data.tags,
		content,
	};
}

export function postMetadataGetAll() {
	const files = fs.readdirSync(POSTS_PATH);
	const posts = files.map((file) => {
		return postMetadataGet(file.replace(/\.mdx$/, ""));
	});
	// sort by date descending
	posts.sort((a, b) => (a.date < b.date ? 1 : -1));
	return posts;
}
