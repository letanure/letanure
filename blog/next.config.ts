import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import rehypePrismPlus from "rehype-prism-plus";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	images: {
		remotePatterns: [
			{
				protocol: 'https' as const,
				hostname: 'source.unsplash.com',
				pathname: '/**',
			},
			{
				protocol: 'https' as const,
				hostname: 'images.unsplash.com',
				pathname: '/**',
			},
			{
				protocol: 'https' as const,
				hostname: 'picsum.photos',
				pathname: '/**',
			},
			{
				protocol: 'https' as const,
				hostname: 'api.dicebear.com',
				pathname: '/**',
			},
		],
	},
};

const withMDX = createMDX({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [remarkFrontmatter],
		rehypePlugins: [rehypePrismPlus],
	},
});

export default withMDX(nextConfig);
