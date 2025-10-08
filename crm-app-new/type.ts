// types/product.ts
export type Dimensions = {
  width: number;
  height: number;
  depth: number;
};

export type Review = {
  rating: number;
  comment: string;
  date: string; // ISO string; có thể chuyển thành Date nếu cần
  reviewerName: string;
  reviewerEmail: string;
};

export type Meta = {
  createdAt: string; // ISO
  updatedAt: string; // ISO
  barcode?: string;
  qrCode?: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  thumbnail?: string | null;
  images?: string[];
};

export type ProductResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type CartResponse = {
  id: number;
  userId: number;
  products: [Product];
  total: number;
  discountedTotal: number;
  totalQuantity: number;
};
