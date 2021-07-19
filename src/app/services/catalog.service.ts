import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CatalogService {
  authCheck = new Subject<any>();

  constructor(private http: HttpClient) {}

  getIngredients() {
    return this.http.get<any[]>("/catalog/products");
  }

  saveProduct(product) {
    return this.http.post<any[]>("/catalog/product", product);
  }

  deleteProduct(id) {
    return this.http.delete<any[]>("/catalog/product/" + id);
  }
}
