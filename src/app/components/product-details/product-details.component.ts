import { Product } from './../../common/product';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product = new Product();
  constructor(private productService: ProductService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.paramMap.subscribe(() => {
      this.getProductDetail();
    })
  }
  getProductDetail() {
    const theProductId: number = +this.router.snapshot.paramMap.get('id');
    this.productService.getProductDetaile(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

}
