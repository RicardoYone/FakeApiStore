import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  private productsSub: Subscription = Subscription.EMPTY;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts();
    this.productsSub = this.productService.productsUpdated.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }
}
