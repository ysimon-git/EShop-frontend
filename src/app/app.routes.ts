import { Routes } from '@angular/router';
import { ProductList } from './features/catalog/pages/product-list/product-list';
import { Basket } from './features/basket/pages/basket/basket';
import { Login } from './features/auth/pages/login/login';
import { Order } from './features/order/createorder/pages/order';
import { Register } from './features/auth/pages/register/register';
import { Orderslist } from './features/order/getorder/pages/orderslist';
import { authGuard } from './core/guards/auth-guard';




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
    component: Order,
    canActivate: [authGuard]
  },
   {
    path: 'orderslist',
    component: Orderslist,
    canActivate: [authGuard]
  },
  {
    path: 'register',
    component: Register
  }
];
