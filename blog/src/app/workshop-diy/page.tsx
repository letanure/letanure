import { WorkshopItem } from "@/components/WorkshopItem";
import { workshopItems } from "@/data/workshopItems";

export default function WorkshopPage() {
  return (
    <div className="py-8 sm:py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-[#292929] dark:text-[#E6E6E6] mb-4">
          Workshop & DIY
        </h1>
        <p className="text-lg text-[#6B6B6B] dark:text-[#8F8F8F]">
          Explore hands-on projects and tutorials for building, creating, and learning.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workshopItems.map((item) => (
          <WorkshopItem key={item.slug} {...item} />
        ))}
      </div>
    </div>
  );
}