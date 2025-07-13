import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Tag } from "./ui/Tag";

interface PostCardProps {
  title: string;
  date: string;
  summary: string;
  slug: string;
  tags: string[];
}

export function PostCard({ title, date, summary, slug, tags }: PostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h2>
        <time className="text-sm text-gray-500 dark:text-gray-400 mb-4 block">
          {formatDate(date)}
        </time>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {summary}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag} text={tag} href={`/blog/tag/${tag}`} />
          ))}
        </div>
      </div>
    </Link>
  );
} 