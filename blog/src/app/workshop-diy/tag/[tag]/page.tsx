import { WorkshopItem } from "@/components/WorkshopItem";
import { workshopItems } from "@/data/workshopItems";

export default function TagPage({ params }: { params: { tag: string } }) {
  const { tag } = params;
  const filteredItems = workshopItems.filter((item) =>
    item.tags.includes(tag)
  );

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        {tag.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <WorkshopItem key={item.slug} {...item} />
        ))}
      </div>
    </div>
  );
} 