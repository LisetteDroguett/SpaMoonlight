import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiclientService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  apiURL = 'http://192.168.0.6:3000';

  constructor(private http:HttpClient) { }

  getProductos():Observable<any>{
    return this.http.get(this.apiURL+'/products/').pipe(
      retry(3)
    );
  }

  getProducto(id:any):Observable<any>{
    return this.http.get(this.apiURL+'/products/'+id).pipe(
      retry(3)
    );
  }

  createProducto(products:any):Observable<any>{
    return this.http.post(this.apiURL+'/products',products,this.httpOptions).pipe(
      retry(3)
    );
  }

  updateProducto(id:any,products:any):Observable<any>{
    return this.http.put(this.apiURL+'/products'+id,products,this.httpOptions).pipe(retry(3));
  }

  deletePost(id:any):Observable<any>{
    return this.http.delete(this.apiURL+'/products'+id,this.httpOptions);
  }

}
