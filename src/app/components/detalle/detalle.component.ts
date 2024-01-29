import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent {
  id = '';
  products: Product | undefined;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.http
      .get<Product>(`https://api.escuelajs.co/api/v1/products/${this.id}`)
      .subscribe((res) => {
        console.log(res);
        this.products = res;
      });
  }
}
