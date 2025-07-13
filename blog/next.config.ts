import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [
			remarkFrontmatter,
			[remarkMdxFrontmatter, { name: "metadata" }],
		],
		// Add basic syntax highlighting without rehype-prism-plus
		rehypePlugins: [],
	},
});

export default withMDX(nextConfig);
