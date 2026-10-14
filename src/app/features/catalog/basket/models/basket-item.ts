export interface BasketItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;       // Quantité commandée
  stockQuantity: number;  // Stock total du catalogue
}