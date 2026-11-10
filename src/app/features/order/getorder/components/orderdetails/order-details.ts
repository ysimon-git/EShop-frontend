import { Component, input } from "@angular/core";
import { OrderDetails as OrderDetailsModel} from "../../models/order-details.model";
import { OrderItems } from "../orderitems/order-items";






@Component({
  selector: 'app-order-details',
  imports: [OrderItems],
  templateUrl: './order-details.html',
})
export class OrderDetails {


      order = input.required<OrderDetailsModel>();

}