import Image from "next/image";
import { Tag } from "@/components/ui/Tag";
import { serialize } from 'next-mdx-remote/serialize';
import { MDXContent } from "@/components/MDXContent";

// This would typically come from your CMS or database
const workshopItems = [
  {
    title: "Building a Raspberry Pi Home Server",
    description: "Learn how to set up a powerful home server using Raspberry Pi for self-hosting applications.",
    slug: "raspberry-pi-home-server",
    tags: ["raspberry-pi", "self-hosting", "linux"],
    imageUrl: "/images/workshop/raspberry-pi-server.jpg",
    content: `
      # Building a Raspberry Pi Home Server

      In this guide, we'll walk through setting up a powerful home server using Raspberry Pi.

      ## Requirements

      - Raspberry Pi 4 (4GB or 8GB RAM recommended)
      - MicroSD card (32GB or larger)
      - Power supply
      - Case (optional but recommended)

      ## Step 1: Prepare the SD Card

      First, we need to flash the operating system to the SD card...

      ## Step 2: Initial Setup

      After flashing the OS, we'll do the initial configuration...

      ## Step 3: Install Docker

      Docker will help us manage our applications...

      ## Step 4: Set Up Applications

      Now we can start installing and configuring our applications...
    `,
    gallery: [
      "/images/workshop/raspberry-pi-server-1.jpg",
      "/images/workshop/raspberry-pi-server-2.jpg",
      "/images/workshop/raspberry-pi-server-3.jpg"
    ]
  },
  {
    title: "Home Automation with ESP32",
    description: "Create a smart home system using ESP32 microcontrollers and Home Assistant.",
    slug: "esp32-home-automation",
    tags: ["iot", "home-automation", "esp32"],
    imageUrl: "/images/workshop/esp32-automation.jpg",
    content: `
      # Home Automation with ESP32

      Learn how to build a smart home system using ESP32 microcontrollers and Home Assistant.

      ## Requirements

      - ESP32 development board
      - Sensors and actuators
      - Home Assistant instance
      - Basic electronics knowledge

      ## Step 1: Setting Up ESP32

      First, we'll set up the ESP32 development environment...

      ## Step 2: Creating Your First Sensor

      Let's create a temperature and humidity sensor...

      ## Step 3: Integrating with Home Assistant

      Now we'll connect our ESP32 to Home Assistant...

      ## Step 4: Adding More Devices

      Expand your system with more sensors and actuators...
    `,
    gallery: [
      "/images/workshop/esp32-automation-1.jpg",
      "/images/workshop/esp32-automation-2.jpg",
      "/images/workshop/esp32-automation-3.jpg"
    ]
  },
  {
    title: "3D Printing Basics",
    description: "Get started with 3D printing: from choosing a printer to your first successful print.",
    slug: "3d-printing-basics",
    tags: ["3d-printing", "maker", "hardware"],
    imageUrl: "/images/workshop/3d-printing.jpg",
    content: `
      # 3D Printing Basics

      A comprehensive guide to getting started with 3D printing.

      ## Requirements

      - 3D printer (we'll help you choose one)
      - Filament
      - Basic tools
      - Slicing software

      ## Step 1: Choosing Your First Printer

      We'll help you select the right printer for your needs...

      ## Step 2: First-Time Setup

      Learn how to set up and calibrate your printer...

      ## Step 3: Your First Print

      Walk through the process of creating your first 3D print...

      ## Step 4: Troubleshooting

      Common issues and how to solve them...
    `,
    gallery: [
      "/images/workshop/3d-printing-1.jpg",
      "/images/workshop/3d-printing-2.jpg",
      "/images/workshop/3d-printing-3.jpg"
    ]
  }
];

export default async function WorkshopItemPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const item = workshopItems.find((item) => item.slug === slug);

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Workshop not found
        </h1>
      </div>
    );
  }

  const mdxSource = await serialize(item.content);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <article className="prose dark:prose-invert max-w-none">
        <h1>{item.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
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

        <div className="mt-8 prose dark:prose-invert">
          <MDXContent source={mdxSource} />
        </div>
      </article>
    </div>
  );
} 