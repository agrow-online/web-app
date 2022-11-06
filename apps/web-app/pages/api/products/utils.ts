import { DBProduct, Product } from '../../../types/products';

export const mapProductVariantsToProducts = (data: DBProduct[]) => {
  const products: Product[] = [];

  data.map((product) => {
    product.variants
      .sort((a, b) => a.quantity - b.quantity)
      .sort((a, b) => {
        // To ensure that ml or g come before kg or l respectively
        if (a.unit !== b.unit) {
          if (a.unit === 'kg' || a.unit === 'l') return -1;
          else if (a.unit === 'g' || a.unit === 'ml') return 1;
        }
        return 0;
      })
      .map((variant) => {
        products.push({
          ...variant,
          name: product.name,
          description: product.description,
          brand: product.brand,
          subCategory: product.subCategory,
          category: product.category,
        });
      });
  });

  return products;
};

export const getPagination = ({ page = 0, size = 100 }: { page?: number; size?: number }) => {
  const limit = +size;
  const from = page ? page * limit : 0;
  const to = page ? from + size : size;

  return { from, to };
};
