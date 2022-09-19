import { seed as seedCategories } from './seeds/categories/seed';
import { seed as seedProducts } from './seeds/products/seed';

const seed = async () => {
  await seedCategories();
  await seedProducts();
};

seed();
