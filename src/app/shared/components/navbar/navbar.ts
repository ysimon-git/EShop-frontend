import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasketService } from '../../../features/catalog/basket/services/basket.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html'

})
export class Navbar {
  readonly basketService = inject(BasketService);
}