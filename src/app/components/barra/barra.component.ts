import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Categorie } from 'src/app/models/categorie.model';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css'],
})
export class BarraComponent {
  categories: Categorie[] = [];

  panelOpenState = false;

  constructor(private http: HttpClient, private productService: ProductService) { }

  ngOnInit(): void {
    this.http
      .get<Categorie[]>('https://api.escuelajs.co/api/v1/categories')
      .subscribe((res) => {
        this.categories = res;
      });
  }

  filterProducts(categoryName: string) {
    if (categoryName === 'all') {
      this.productService.getAllProducts();
    } else {
      this.productService.getProductsByCategory(categoryName);
    }
  }
}
