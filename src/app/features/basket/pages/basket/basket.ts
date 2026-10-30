import { Component, inject, computed, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { BasketService } from '../../services/basket.service';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-basket',
  imports: [CurrencyPipe],
  templateUrl: './basket.html',
  styleUrl: './basket.css'
})
export class Basket {

 
  private readonly router = inject(Router);
  private readonly basketService = inject(BasketService);
  private readonly authservice=inject(AuthService);
  private isAuthenticated:boolean=false;


  readonly basketItems = this.basketService.items;
  private info=signal<string>('');

 /*  readonly totalAmount = computed(() => {
    let total = 0;

    for (const item of this.basketItems()) {
      total += item.price * item.quantity;
    }

    return total;
  }); */

  getTotalAmount():number{
    return this.basketService.totalAmount();
  }

  
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


  SubmitOrder():void{


      if(this.authservice.isAuthenticated())
      {
          this.isAuthenticated=true;        
          this.router.navigate(['order']);
      }else{
        this.info.set("Vous devez vous connecter pour passer commande.");
      }

    
  
  }





  

 






  


}