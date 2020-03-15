import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  currenCategoryId: number;
  currentCategoryName: string;
  searchMode: boolean;

  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProduct();
    })
  }

  listProduct() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }
  handleSearchProducts() {
    const theKey: string = this.route.snapshot.paramMap.get('keyword');
    this.productService.searchProduct(theKey).subscribe(
      data => {
        this.products = data;
      }
    )
  }
  handleListProducts() {
    // check if "id" is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      //get id and convert to number
      this.currenCategoryId = +this.route.snapshot.paramMap.get('id');
      //get category name
      this.currentCategoryName = this.route.snapshot.paramMap.get('name');
    } else {
      this.currenCategoryId = 1;
      this.currentCategoryName = 'Books';
    }
    this.productService.getProductList(this.currenCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }
}
