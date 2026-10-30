import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { Brand } from '../../models/brand';


import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { BrandService } from '../../services/brand.service';
import { ProductCard } from '../../components/product-card/product-card';



@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCard],
  templateUrl: './product-list.html'
})
export class ProductList implements OnInit {

  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);
  private readonly brandService = inject(BrandService);

  selectedCategoryId = signal<string | null>(null);
  selectedBrandId = signal<string | null>(null);
  
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  brands = signal<Brand[]>([]);

  
 ngOnInit(): void {

    localStorage.clear(); //clean basket

    this.productService.getProducts().subscribe(products => {
      this.products.set(products);
    });

    this.categoryService.getAll().subscribe(categories => {
      this.categories.set(categories);
    });

    this.brandService.getAll().subscribe(brands => {
      this.brands.set(brands);
    });
}



  onCategoryChange(event: Event): void {
      const select = event.target as HTMLSelectElement;

      this.selectedCategoryId.set(
        select.value || null
      );
    }

    onBrandChange(event: Event): void {
      const select = event.target as HTMLSelectElement;

      this.selectedBrandId.set(
        select.value || null
      );
  }



  private loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products.set(products);
      },
      error: (error: unknown) => {
        console.error('Error loading products', error);
      }
    });
  }


  filteredProducts = computed(() => {

          let result = this.products();

          const categoryId = this.selectedCategoryId();
          const brandId = this.selectedBrandId();

          if (categoryId) {
            result = result.filter(
              product => product.categoryId === categoryId
            );
          }

          if (brandId) {
            result = result.filter(
              product => product.brandId === brandId
            );
          }

          return result;
  });

}