"use client";

import Link from "next/link";
import Image from "next/image";
import { Tag } from "@/components/ui/Tag";

interface WorkshopItemProps {
  title: string;
  description: string;
  slug: string;
  tags: string[];
  imageUrl?: string;
}

export function WorkshopItem({
  title,
  description,
  slug,
  tags,
  imageUrl,
}: WorkshopItemProps) {
  return (
    <Link
      href={`/workshop-diy/${slug}`}
      className="group block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-6">
        {imageUrl && (
          <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        )}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag} text={tag} href={`/workshop-diy/tag/${tag}`} />
          ))}
        </div>
      </div>
    </Link>
  );
} 