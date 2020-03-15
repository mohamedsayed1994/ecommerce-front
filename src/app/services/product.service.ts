import { ProductCategory } from './../common/product-category';
import { Product } from './../common/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private urlBase = 'http://localhost:7070/api/products';
  private categoryUrl = 'http://localhost:7070/api/product-category';

  constructor(private httpClient: HttpClient) { }
  getProductList(theCategoryId: number): Observable<Product[]> {
    // build url based on category id
    const searchUrl = `${this.urlBase}/search/findByCategoryId?id=${theCategoryId}`
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
  // get list of category for the menu
  getProductCategory(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCaategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  }
}
interface GetResponseProductCaategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
