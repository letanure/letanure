import remarkGfm from "remark-gfm";
import rehypePrismPlus from "rehype-prism-plus";

export default {
	remarkPlugins: [remarkGfm],
	rehypePlugins: [rehypePrismPlus],
};
