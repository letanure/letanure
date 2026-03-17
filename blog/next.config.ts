import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'source.unsplash.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'picsum.photos',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'api.dicebear.com',
				pathname: '/**',
			},
		],
	},
};

const withMDX = createMDX({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: ['remark-frontmatter'],
		rehypePlugins: ['rehype-prism-plus'],
	},
});

export default withMDX(nextConfig);
