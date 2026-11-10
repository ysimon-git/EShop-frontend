import { OrderSummary } from "./order-summary.model";
import { OrderItem } from "./order-item.model";


export interface OrderDetails extends OrderSummary {
 
  note: string | null;
  items: OrderItem[];
}