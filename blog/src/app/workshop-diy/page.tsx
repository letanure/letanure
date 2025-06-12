import { WorkshopItem } from "@/components/WorkshopItem";
import { workshopItems } from "@/data/workshopItems";

export default function WorkshopPage() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Workshop & DIY
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Explore hands-on projects and tutorials for building, creating, and learning.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workshopItems.map((item) => (
          <WorkshopItem key={item.slug} {...item} />
        ))}
      </div>
    </div>
  );
} 