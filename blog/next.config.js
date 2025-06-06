import createMDX from "@next/mdx";
import mdxConfig from "./mdx.config.js";

const withMDX = createMDX(mdxConfig);

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
	experimental: {
		mdxRs: true,
	},
};

export default withMDX(nextConfig);
