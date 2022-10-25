export interface DBProduct {
  id: string;
  name: string;
  description: string;
  variants: [
    {
      id: string;
      productId: string;
      quantity: number;
      unit: string;
      image: string;
      createdAt: Date;
      updatedAt: Date;
    }
  ];
  brand: {
    id: string;
    name: string;
  };
  subCategory: {
    id: string;
    descriptiveName: string;
  };
  category: {
    id: string;
    name: string;
  };
}

export interface Product {
  id: string;
  productId: string;
  name: string;
  description: string;
  image: string;
  quantity: number;
  unit: string; // TODO: type Unit
  createdAt: Date;
  updatedAt: Date;
  brand: {
    id: string;
    name: string;
  };
  subCategory: {
    id: string;
    descriptiveName: string;
  };
  category: {
    id: string;
    name: string;
  };
}
