export interface WorkshopItem {
  title: string;
  description: string;
  slug: string;
  tags: string[];
  imageUrl?: string;
  imageKeywords?: string;
  content?: string;
  gallery?: string[];
}

export const workshopItems: WorkshopItem[] = [
  {
    title: "Laser Cut Paintable Wood Kits",
    description: "Creating DIY kits from 3mm wood sheets using xTool and selling them online.",
    slug: "laser-wood-kits",
    tags: ["diy", "woodworking", "laser", "painting"],
    imageUrl: "/images/grant-durr-yJuSGc9V9yY-unsplash.jpg",
    imageKeywords: "laser,wood,kit,diy,craft",
    content: `
      # Laser Cut Paintable Wood Kits

      Explore my process for designing, cutting, and finishing wooden kits made for painting and crafting.
    `,
  },
  {
    title: "Rug Tufting Experiments",
    description: "Documenting the process of designing and creating custom tufted rugs using a tufting gun.",
    slug: "rug-tufting",
    tags: ["craft", "rug", "tufting", "design"],
    imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=rug-tufting",
    imageKeywords: "rug,tufting,yarn,gun,textile",
    content: `
      # Rug Tufting Experiments

      I'm exploring the world of rug tufting — from learning the tools to creating original designs.
    `,
  },
  {
    title: "Laser-Engraved Knives",
    description: "Engraving patterns, names, and illustrations onto knife blades and wooden handles using laser tools.",
    slug: "laser-engraved-knives",
    tags: ["laser", "knives", "engraving", "tools"],
    imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=laser-engraved-knives",
    imageKeywords: "knife,engraving,laser,blade,wood",
    content: `
      # Laser-Engraved Knives

      Custom laser engraving on knives — exploring materials, styles, and personalization options.
    `,
  },
  {
    title: "Cold Ceramic with Natural Motifs",
    description: "Creating handcrafted objects using cold porcelain inspired by leaves, flowers, and textures from nature.",
    slug: "cold-ceramic-nature",
    tags: ["ceramic", "nature", "sculpture", "diy"],
    imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=cold-ceramic-nature",
    imageKeywords: "cold,ceramic,nature,porcelain,leaf",
    content: `
      # Cold Ceramic with Natural Motifs

      Handmade cold porcelain items with imprints and shapes inspired by natural elements.
    `,
  },
];
