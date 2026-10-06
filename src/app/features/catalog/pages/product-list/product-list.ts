import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.html'
})
export class ProductList implements OnInit {

  private readonly productService = inject(ProductService);

  private readonly changeDetector =
    inject(ChangeDetectorRef);

  products: Product[] = [];

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {

    this.productService.getProducts().subscribe({

      next: (products) => {

        this.products = products;

        console.log(
          'Products assigned:',
          this.products.length
        );

        this.changeDetector.detectChanges();
      },

      error: (error) => {
        console.error(
          'Error loading products',
          error
        );
      }

    });
  }
}