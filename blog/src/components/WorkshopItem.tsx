"use client";

import Link from "next/link";
import Image from "next/image";

interface WorkshopItemProps {
  title: string;
  description: string;
  slug: string;
  tags: string[];
  imageUrl?: string;
  imageKeywords?: string;
}

export function WorkshopItem({
  title,
  description,
  slug,
  tags,
  imageUrl,
}: WorkshopItemProps) {
  // Use provided imageUrl, or generate one from title as fallback
  const finalImageUrl = imageUrl || `https://picsum.photos/400/240?random=${title.length}`;

  return (
    <Link
      href={`/workshop-diy/${slug}`}
      className="group block bg-[rgba(0,0,0,0.02)] dark:bg-[rgba(255,255,255,0.02)] rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.12)] hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(0,0,0,0.12)] dark:hover:border-[rgba(255,255,255,0.2)] transition-all duration-200"
    >
      <div className="p-6">
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] dark:from-[#4f46e5] dark:to-[#7c3aed]">
          <Image
            src={finalImageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              // Fallback to gradient background if image fails
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          {/* Fallback overlay with gradient and icon - always visible for nice effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/10 to-[#8b5cf6]/10 dark:from-[#4f46e5]/20 dark:to-[#7c3aed]/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 rounded-full bg-white/20 dark:bg-white/10 flex items-center justify-center backdrop-blur-sm">
              <svg 
                className="w-8 h-8 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" 
                />
              </svg>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-[#292929] dark:text-[#E6E6E6] mb-2 group-hover:text-[#1A8917] dark:group-hover:text-[#1DB954] transition-colors">
          {title}
        </h2>
        <p className="text-[#6B6B6B] dark:text-[#8F8F8F] mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs text-[#757575] dark:text-[#A8A8A8] px-2 py-0.5 bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.08)] rounded-full hover:text-[#292929] dark:hover:text-[#E6E6E6] transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}