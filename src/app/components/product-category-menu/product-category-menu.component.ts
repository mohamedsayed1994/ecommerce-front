import { ProductCategory } from './../../common/product-category';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {
  productCategory: ProductCategory[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.listProductCategory();
  }
  listProductCategory() {
    this.productService.getProductCategory().subscribe(
      data => {
        console.log('product Category = ' + JSON.stringify(data));
        this.productCategory = data;
      }
    )
  }
}
