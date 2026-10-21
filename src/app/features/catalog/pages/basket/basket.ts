import { Component, inject, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { BasketService } from '../../basket/services/basket.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-basket',
  imports: [CurrencyPipe],
  templateUrl: './basket.html',
  styleUrl: './basket.css'
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


  getImageUrl(imageUrl: string | null): string {
      if (!imageUrl) {
        return 'assets/no-image.png';
      }

      console.log('imageUrl:',imageUrl)

      if (imageUrl.startsWith('http://') ||
          imageUrl.startsWith('https://')) {
        return imageUrl;
      }

      return `${environment.apiUrls.catalogImages}${imageUrl}`;
}

  

 






  


}