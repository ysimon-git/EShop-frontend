import { Routes } from '@angular/router';
import { ProductList } from './features/catalog/pages/product-list/product-list';
import { Basket } from './features/catalog/pages/basket/basket';



export const routes: Routes = [
  {
    path: '',
    component: ProductList
  },
  {
    path: 'basket',
    component: Basket
  }
];
