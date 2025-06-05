import Link from "next/link";
import { getAllPostsMeta } from "@/utils/mdx";

export default async function BlogIndexPage() {
	const posts = await getAllPostsMeta();
	return (
		<section className="max-w-2xl mx-auto">
			<h1 className="text-3xl font-bold mb-6">Blog</h1>
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
		</section>
	);
}
