import { WorkshopItem } from "@/components/WorkshopItem";
import { Tag } from "@/components/ui/Tag";

// This would typically come from your CMS or database
const workshopItems = [
  {
    title: "Building a Raspberry Pi Home Server",
    description: "Learn how to set up a powerful home server using Raspberry Pi for self-hosting applications.",
    slug: "raspberry-pi-home-server",
    tags: ["raspberry-pi", "self-hosting", "linux"],
    imageUrl: "/images/workshop/raspberry-pi-server.jpg"
  },
  {
    title: "Home Automation with ESP32",
    description: "Create a smart home system using ESP32 microcontrollers and Home Assistant.",
    slug: "esp32-home-automation",
    tags: ["iot", "home-automation", "esp32"],
    imageUrl: "/images/workshop/esp32-automation.jpg"
  },
  {
    title: "3D Printing Basics",
    description: "Get started with 3D printing: from choosing a printer to your first successful print.",
    slug: "3d-printing-basics",
    tags: ["3d-printing", "maker", "hardware"],
    imageUrl: "/images/workshop/3d-printing.jpg"
  }
];

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