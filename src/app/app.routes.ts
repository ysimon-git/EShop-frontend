import { Routes } from '@angular/router';
import { ProductList } from './features/catalog/pages/product-list/product-list';
import { Basket } from './features/basket/pages/basket/basket';
import { Login } from './features/auth/pages/login/login';
import { Order } from './features/order/pages/order';
import { Register } from './features/auth/pages/register/register';



export const routes: Routes = [
  {
    path: '',
    component: ProductList
  },
  {
    path: 'basket',
    component: Basket
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'order',
    component: Order
  },
  {
    path: 'register',
    component: Register
  }
];
