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
  products: Product[] = [];
  currenCategoryId: number = 1;
  currentCategoryName: string;
  searchMode: boolean = false;
  //pagenation attributes
  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;
  previousCategoryId: number = 1;

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
    //check if have different category than previous

    //if have different category id than previous
    //then set page number back to 1
    if (this.previousCategoryId != this.currenCategoryId) {
      this.currenCategoryId = 1;
    }

    this.previousCategoryId = this.currenCategoryId;
    console.log(`currenCategoryId: ${this.currenCategoryId}, PageNumber: ${this.pageNumber}`);
    // get the product for given category id
    this.productService.getProductListPaginate(this.pageNumber - 1, this.pageSize, this.currenCategoryId)
      .subscribe(this.processResult());
    // this.productService.getProductList(this.currenCategoryId).subscribe(
    //   data => {
    //     this.products = data;
    //   }
    // )
  }
  //map data from spring to attribute
  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }
  //selection size
  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listProduct();
  }
}
