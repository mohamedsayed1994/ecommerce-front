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
  constructor(private httpClient:HttpClient) { }
  getProductList(): Observable<Product[]>{
    return this.httpClient.get<GetResponse>(this.urlBase).pipe(
      map(response => response._Embeded.products)
    );
  }
}
interface GetResponse{
  _Embeded:{
    products:Product[];
  }
}