import path from 'path';
import { products } from './data';
import { prisma, PrismaClient, Unit } from '@prisma/client';

const client = new PrismaClient();

const splitVariantIntoQuantityAndUnit = (variant: string) => {
  const val = variant.match(/([\d\.]+)(.*)/);
  return [
    { quantity: parseFloat(val?.[1]!), unit: val?.[2]!.replace(/ /g,'').toUpperCase() as Unit | 'UNIT' },
  ];
};

const mappedProducts = products.map((product) => ({
  name: product.name,
  brand: product.brand,
  subCategory: product.sub_category,
  description: product.description,
  image: path.basename(product.image),
  variants: product.variant?.[0]?.size?.length
    ? splitVariantIntoQuantityAndUnit(product.variant[0].size)
    : [],
}));

const mappedProductsWithVariants = mappedProducts.reduce((acc, { name, ...rest }) => {
  if (!acc[name]) {
    acc[name] = rest;
    if()
  } else {
    acc[name].variants.push(rest.variants?.[0]);
  }
  return acc;
}, {} as { [key: string]: { brand: string; subCategory: string; image: string; description: string; variants: { quantity: number; unit: Unit | 'UNIT' }[] } });

export const seed = async () => {
  const subCategories = await client.productSubCategory.findMany({ include: { category: true } });

  const erroredProducts = [];
  const errors = [];
  let sub;
  for (const mappedProduct of Object.entries(mappedProductsWithVariants)) {
    try {
      const [key, value] = mappedProduct;
      const { variants, ...rest } = value;
      const subCategory = subCategories.find(
        (subCategory) => subCategory.descriptiveName === rest.subCategory || 'Miscellaneous'
      )!;

      sub = subCategory;
      const product = await client.product.upsert({
        where: { name: key },
        update: {},
        create: {
          ...rest,
          name: key,
          brand: {
            connectOrCreate: {
              where: { name: rest.brand },
              create: {
                name: rest.brand,
              },
            },
          },
          category: {
            connect: {
              id: subCategory?.category?.id,
            },
          },
          subCategory: {
            connect: {
              descriptiveName: subCategory.descriptiveName,
            },
          },
        },
      });

      if (variants.length) {
        for (const variant of variants) {
          await client.productVariant.create({
            data: {
              ...variant,
              unit: variant.unit === 'UNIT' ? Unit.ITEM : variant.unit,
              product: { connect: { id: product.id } },
            },
          });
        }
      } else {
        await client.productVariant.create({
          data: {
            name: 'no-variant',
            product: { connect: { id: product.id } },
          },
        });
      }
    } catch (e) {
      errors.push(e);
      erroredProducts.push({ ...mappedProduct, originilal: sub });
    }
  }

  console.log({ errors, erroredProducts: JSON.stringify(erroredProducts, null, 2) });
};

seed();
