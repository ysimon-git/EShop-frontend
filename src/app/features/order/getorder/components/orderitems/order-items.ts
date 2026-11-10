import { Component, input } from "@angular/core";
import { environment } from "../../../../../../environments/environment";
import { CommonModule } from "@angular/common";
import { OrderItem } from "../../models/order-item.model";

@Component({
  selector: 'tr[app-order-items]',
  imports: [CommonModule],
  templateUrl: './order-items.html',
  styleUrl: './order-items.css'
})
export class OrderItems {


      orderItem = input.required<OrderItem>();
    



    getImageUrl(imageUrl: string): string {
            return `${environment.apiUrls.catalogImages}/${imageUrl.replace(/^\/+/, '')}`;
    }

}