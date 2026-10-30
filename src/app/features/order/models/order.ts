import { order_item } from "./order_item";

export interface order {
  //customerId: string;
  note: string | null;
  items: order_item[];
}

