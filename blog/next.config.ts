import createMDX from "@next/mdx";
import rehypePrismPlus from "rehype-prism-plus";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
	extension: /\.mdx?$/,
	options: {
		// remarkPlugins: [remarkGfm,
		rehypePlugins: [[rehypePrismPlus, { ignoreMissing: true }]],
		remarkPlugins: [
			remarkFrontmatter,
			[remarkMdxFrontmatter, { name: "metadata" }],
		],
	},
});

export default withMDX(nextConfig);
