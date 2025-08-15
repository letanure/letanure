import Image from "next/image";
import { Tag } from "@/components/ui/Tag";
import { serialize } from 'next-mdx-remote/serialize';
import { MDXContent } from "@/components/MDXContent";
import { workshopItems } from "@/data/workshopItems";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function WorkshopItemPage({ params }: Props) {
  const { slug } = await params;
  const item = workshopItems.find((item) => item.slug === slug);

  if (!item) {
    notFound();
  }

  const mdxSource = await serialize(item.content || '');

  return (
    <div className="max-w-4xl mx-auto px-4">
      <article>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{item.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          {item.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {item.tags.map((tag) => (
            <Tag key={tag} text={tag} href={`/workshop-diy/tag/${tag}`} />
          ))}
        </div>

        {item.imageUrl && (
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {item.gallery && item.gallery.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {item.gallery.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`${item.title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {item.content && (
          <div className="mt-8 prose dark:prose-invert">
            <MDXContent source={mdxSource} />
          </div>
        )}
      </article>
    </div>
  );
} 