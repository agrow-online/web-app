import { PrismaClient } from '@prisma/client';
import { categories } from './data';

const client = new PrismaClient();

export const seed = async () => {
  for (const category of categories) {
    for (const subCategory of category.subCategories) {
      await client.productSubCategory.upsert({
        where: { descriptiveName: subCategory.descriptiveName },
        update: { ...subCategory },
        create: {
          ...subCategory,
          category: {
            connectOrCreate: { where: { name: category.name }, create: { name: category.name } },
          },
        },
      });
    }
  }
};
