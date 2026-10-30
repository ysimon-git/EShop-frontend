import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasketService } from '../../../features/basket/services/basket.service';
import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html'

})
export class Navbar {
  readonly basketService = inject(BasketService);
  readonly authService=inject(AuthService);
}