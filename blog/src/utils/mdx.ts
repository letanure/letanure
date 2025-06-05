import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypePrism from "rehype-prism-plus";

const POSTS_PATH = path.join(process.cwd(), "src/content/posts");

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
	content: MDXRemoteSerializeResult;
}> {
	const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
	const source = fs.readFileSync(filePath, "utf8");
	const { content, data } = matter(source);
	const mdxSource = await serialize(content, {
		scope: data,
		mdxOptions: {
			rehypePlugins: [rehypePrism],
		},
	});
	return {
		meta: {
			slug,
			title: data.title || slug,
			date: data.date || "",
			summary: data.summary || "",
			tags: data.tags || [],
		},
		content: mdxSource,
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
