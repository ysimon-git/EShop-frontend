import { Component, inject, signal } from "@angular/core";
import { BasketService } from "../../basket/services/basket.service";
import { order } from "../models/order";
import { order_item } from "../models/order_item";
import { OrderService } from "../services/order.service";

@Component({
  selector: 'app-basket',
  templateUrl: './order.html',
})
export class Order {

    private readonly basketService = inject(BasketService);
    private readonly orderService = inject(OrderService);

    readonly basketItems = this.basketService.items;
    readonly note = signal('');
    readonly orderNumber = signal<string | null>(null);


  confirmOrder(): void {

    console.log("in confirmOrder");

      if (this.basketItems().length === 0) {
        return;
      }

      const orderData: order = {
       // customerId:"todefine",
        note: this.note(),
        items: this.basketItems().map(item => ({
          ProductId: item.productId,
          Quantity: item.quantity
        }))
      };


      this.orderService.sendOrder(orderData).subscribe({
            next: (response) => {
                console.log("Commande créée :", response.orderNumber);
                this.basketService.emptyBasket();
                this.orderNumber.set(response.orderNumber);   
                
            },
            error: (error) => {
                console.error("Erreur création commande :", error);
            }
      });

   
}


}