import { Prisma } from '@prisma/client';

export const categories: Array<
  Prisma.ProductCategoryCreateInput & {
    subCategories: Omit<Prisma.ProductSubCategoryCreateInput, 'category'>[];
  }
> = [
  {
    name: 'Animal health',
    subCategories: [
      {
        technicalName: 'Anthelmintics',
        descriptiveName: 'Dewormers',
      },
      {
        technicalName: 'Hygiene & Disinfectants',
        descriptiveName: 'Hygiene and disinfectants',
      },
      {
        technicalName: 'Ectoparasites',
        descriptiveName: 'External pests control',
      },
      {
        technicalName: 'OTC Vaccines',
        descriptiveName: 'Vaccines',
      },
    ],
  },
  {
    name: 'Animal nutrition',
    subCategories: [
      {
        technicalName: 'Animal feeds',
        descriptiveName: 'Feeds',
      },
      {
        technicalName: 'Mineral supplements',
        descriptiveName: 'Mineral supplements',
      },
    ],
  },

  {
    name: 'Capital inputs',
    subCategories: [
      {
        technicalName: 'Farm tools and equipment',
        descriptiveName: 'Tools and equipment',
      },
      {
        technicalName: 'Post-harvest products',
        descriptiveName: 'Post-harvest products',
      },
      {
        technicalName: 'Veterinary equipment',
        descriptiveName: 'Veterinary equipment',
      },
    ],
  },

  {
    name: 'Crop nutrition',
    subCategories: [
      {
        technicalName: 'Basal fertilizers',
        descriptiveName: 'Fertilizers',
      },
      {
        technicalName: 'Foliar fertilizers',
        descriptiveName: 'Foliar sprays',
      },
      {
        technicalName: 'Foliar fertilizers',
        descriptiveName: 'Growth hormones',
      },
    ],
  },

  {
    name: 'Crop protection',
    subCategories: [
      {
        technicalName: 'Herbicides',
        descriptiveName: 'Weed control',
      },
      {
        technicalName: 'Fungicides',
        descriptiveName: 'Disease control',
      },
      {
        technicalName: 'Insecticides',
        descriptiveName: 'Pests control',
      },
      {
        technicalName: 'IPM products',
        descriptiveName: 'Integrated pest management',
      },
    ],
  },

  {
    name: 'Seeds and Seedlings',
    subCategories: [
      {
        technicalName: 'Seeds',
        descriptiveName: 'Seeds',
      },
      {
        technicalName: 'Seedlings',
        descriptiveName: 'Seedlings',
      },
    ],
  },

  {
    name: 'Agricultural services',
    subCategories: [
      {
        technicalName: 'Soil testing',
        descriptiveName: 'Soil testing',
      },
      {
        technicalName: 'Veterinary services',
        descriptiveName: 'Vet services',
      },
      {
        technicalName: 'Insurance',
        descriptiveName: 'Agricultural insurance',
      },
      {
        technicalName: 'Mechanisation services',
        descriptiveName: 'Tractor services',
      },
    ],
  },

  {
    name: 'Public health',
    subCategories: [
      {
        technicalName: 'Insecticides',
        descriptiveName: 'Insect control',
      },
      {
        technicalName: 'Rodenticides',
        descriptiveName: 'Rodent control',
      },
      {
        technicalName: 'Hygiene',
        descriptiveName: 'Public hygiene',
      },
    ],
  },
  {
    name: 'FMCGs',
    subCategories: [
      {
        technicalName: 'Home and personal care',
        descriptiveName: 'Home and personal care',
      },
      {
        technicalName: 'Food and beverages',
        descriptiveName: 'Food and beverage',
      },
    ],
  },

  {
    name: 'Household products',
    subCategories: [
      {
        technicalName: 'Electronics',
        descriptiveName: 'Electronics',
      },
    ],
  },
];
