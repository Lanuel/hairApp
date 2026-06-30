import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { seedProducts } from "@/prisma/seed-data";

const CATEGORY = "Wigs";
const HAIR_TYPE = "Virgin Hair";
const HAIR_TEXTURE = "Straight";
const HAIR_LENGTH = '24"';
const HAIR_COLOR = "Natural Black";

export async function main() {
  const existing = await prisma.product.count();
  if (existing > 0) {
    console.log(`Database already has ${existing} products. Skipping seed.`);
    return;
  }

  for (const [index, item] of seedProducts.entries()) {
    await prisma.product.create({
      data: {
        name: item.name,
        slug: item.slug,
        description:
          item.detail ?? `${item.name} — premium GraceT Hair collection.`,
        price: item.priceFrom,
        category: CATEGORY,
        hairType: HAIR_TYPE,
        hairTexture: HAIR_TEXTURE,
        hairLength: item.detail?.split("•")[0]?.trim() ?? HAIR_LENGTH,
        hairColor: HAIR_COLOR,
        featured: item.featured ?? false,
        inStock: true,
        stock: 10,
        images: {
          create: {
            url: item.image,
            publicId: `seed/${item.slug}`,
          },
        },
      },
    });

    console.log(`Seeded ${index + 1}/${seedProducts.length}: ${item.name}`);
  }

  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
