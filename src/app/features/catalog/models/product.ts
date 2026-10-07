export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl: string | null;

  categoryId: string;
  categoryName: string;

  brandId: string;
  brandName: string;
}