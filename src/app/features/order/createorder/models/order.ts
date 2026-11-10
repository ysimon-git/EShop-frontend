import { order_item } from "./order_item";

export interface order {
  //customerId: string; contained in jwt
  note: string | null;
  items: order_item[];
}

