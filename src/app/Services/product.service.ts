import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  BASE_URL = "http://localhost:8080"
  constructor(private http: HttpClient) { }

  getProduits(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/produits');
  }

  addProduit(product: Product): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/addProduit`, {...product});
  }

  updateProduit(id: string, data: Partial<Product>): Observable<any> {
    return this.http.put<any>('/api/produit/:id', data);
  }
  archiveProduit(id:string): Observable<any> {
    return this.http.post<any>('/api/produit/:id', {});
  }
}
