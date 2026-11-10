export interface OrderItem {
  productId: string;
  productName: string;
  imageUrl: string | null;
  category: string;
  brand: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

