import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { getAllPostsMeta } from "@/utils/mdx";

async function getHomeContent(locale = "en") {
	const filePath = path.join(
		process.cwd(),
		`src/content/json/homepage.${locale}.json`,
	);
	const data = await fs.readFile(filePath, "utf8");
	return JSON.parse(data);
}

export default async function HomePage() {
	const content = await getHomeContent();
	const posts = (await getAllPostsMeta()).slice(0, 3);
	return (
		<section className="max-w-2xl mx-auto">
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-2">{content.bio}</h1>
				<p className="text-lg text-gray-700">{content.intro}</p>
			</div>
			<div>
				<h2 className="text-2xl font-semibold mb-4">{content.latestPosts}</h2>
				<ul className="space-y-6">
					{posts.map((post) => (
						<li key={post.slug} className="border-b pb-4">
							<Link
								href={`/blog/${post.slug}`}
								className="text-xl font-semibold hover:underline"
							>
								{post.title}
							</Link>
							<p className="text-gray-500 text-sm">{post.date}</p>
							<p className="mt-1 text-gray-700">{post.summary}</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
