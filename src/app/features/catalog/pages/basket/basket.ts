import { Component, inject, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { BasketService } from '../../basket/services/basket.service';
import { BasketItem } from '../../basket/models/basket-item';

@Component({
  selector: 'app-basket',
  imports: [CurrencyPipe],
  templateUrl: './basket.html'
})
export class Basket {

  private readonly basketService = inject(BasketService);

  readonly basketItems = this.basketService.items;

  readonly totalAmount = computed(() => {
    let total = 0;

    for (const item of this.basketItems()) {
      total += item.price * item.quantity;
    }

    return total;
  });

  
  increaseQuantity(productId: string): void {
    this.basketService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: string): void {
    this.basketService.decreaseQuantity(productId);
  }

  removeProduct(productId: string): void {
    this.basketService.removeProduct(productId);
  }





  


}