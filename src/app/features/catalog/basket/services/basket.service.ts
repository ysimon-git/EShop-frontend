import { computed, effect, Injectable, signal } from '@angular/core';
import { BasketItem } from '../models/basket-item';
import { Product } from '../../models/product';




@Injectable({
  providedIn: 'root'  //only one instance for the whole application (items are shared in basket and product-card)
})
export class BasketService {

  //private readonly _items = signal<BasketItem[]>([]);
  private readonly _items = signal<BasketItem[]>(this.loadBasket()); //to get basket from localStorage
  readonly items = this._items.asReadonly();


  
  constructor() {
      effect(() => { //executed when signal items() change
            localStorage.setItem(
              'basket',
              JSON.stringify(this.items())
            );
          });
    
  }


  private loadBasket(): BasketItem[] {
      const data = localStorage.getItem('basket');

      if (data) {
        return JSON.parse(data);
      }
      return [];
  }


  readonly totalQuantity = computed(() => {
    let total = 0;
    for (const item of this.items()) {
      total += item.quantity;
    }
    return total;
  });


  addProduct(product: Product): void {
   
      const items = this._items();

      const existingItem = items.find(
            item => item.productId === product.id
          );

          if (existingItem && existingItem.quantity < existingItem.stockQuantity) {
            // Le produit existe déjà : augmenter la quantité
            this._items.update(items =>
              items.map(item =>
                item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
              )
            );
          } else {
            // Nouveau produit : créer une ligne dans le panier
            const newItem: BasketItem = {

              productId: product.id,
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl,
              quantity: 1,
              stockQuantity: product.stockQuantity
            };

            this._items.update(items => [...items, newItem]);
          }
  }


  
  getQuantity(productId: string): number {

    const item = this.items().find(
      item => item.productId === productId
    );

    return item?.quantity ?? 0;
  }


  decreaseQuantity(productId: string): void {

        const item = this.items().find(
          item => item.productId === productId
        );

        if (!item) {
          return;
        }

        if (item.quantity === 1) {
          this.removeProduct(productId);
          return;
        }


        const items = [...this._items()];
        const index = items.findIndex(item => item.productId === productId);

        if (index !== -1) {
          items[index] = {...items[index],quantity: items[index].quantity - 1
          };

          this._items.set(items);
        }
  }


 
  increaseQuantity(productId: string): void {

      const items = [...this._items()];

      const item = items.find(item => item.productId === productId);

      if (item && item.quantity < item.stockQuantity) {
        const index = items.indexOf(item);

        items[index] = { ...item, quantity: item.quantity + 1 };

        this._items.set(items);
      }
  }



  removeProduct(productId: string): void {
      this._items.update(items =>
        items.filter(item => item.productId !== productId)
      );
  }

}