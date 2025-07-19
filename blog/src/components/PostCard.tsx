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
      className="group block py-6 border-b border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.12)] hover:border-[rgba(0,0,0,0.12)] dark:hover:border-[rgba(255,255,255,0.2)] transition-colors"
    >
      <article>
        <h2 className="text-xl font-semibold text-[#292929] dark:text-[#E6E6E6] mb-2 group-hover:text-[#1A8917] dark:group-hover:text-[#1DB954] transition-colors">
          {title}
        </h2>
        <time className="text-sm text-[#757575] dark:text-[#A8A8A8] mb-3 block">
          {formatDate(date)}
        </time>
        <p className="text-[#6B6B6B] dark:text-[#8F8F8F] mb-3 line-clamp-2 text-base leading-relaxed">
          {summary}
        </p>
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 4).map((tag) => (
            <span 
              key={tag} 
              className="text-xs text-[#757575] dark:text-[#A8A8A8] px-2 py-0.5 bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.08)] rounded-full hover:text-[#292929] dark:hover:text-[#E6E6E6] transition-colors"
            >
              {tag}
            </span>
          ))}
          {tags.length > 4 && (
            <span className="text-xs text-[#8F8F8F] dark:text-[#6B6B6B] px-2 py-0.5">
              +{tags.length - 4}
            </span>
          )}
        </div>
      </article>
    </Link>
  );
}