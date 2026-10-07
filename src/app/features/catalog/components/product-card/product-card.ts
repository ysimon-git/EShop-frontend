import { Component, input } from '@angular/core';
import { Product } from '../../models/product';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {

  private readonly catalogUrl = environment.apiUrls.catalogImages;

  product = input.required<Product>();

  getImageUrl(): string | null {
    if (!this.product().imageUrl) {
      return null;
    }
    return `${this.catalogUrl}${this.product().imageUrl}`;
  }


}