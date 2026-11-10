export interface OrderSummary {
  id: string;
  orderNumber: string;
  customerId: string;
  createdAtUtc: string;
  totalAmount: number;
  status: string | null;
}


