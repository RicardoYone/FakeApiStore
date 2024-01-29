import { Product } from 'src/app/models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [];
  productsUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient) {}

  getAllProducts() {
    this.http
      .get<Product[]>('https://api.escuelajs.co/api/v1/products')
      .subscribe((res) => {
        this.products = res;
        this.productsUpdated.next([...this.products]);
      });
  }

  getProductsByCategory(categoryName: string) {
    this.http
      .get<Product[]>('https://api.escuelajs.co/api/v1/products')
      .subscribe((res) => {
        this.products = res.filter(
          (product) => product.category.name === categoryName
        );
        this.productsUpdated.next([...this.products]);
      });
  }
}
