import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ADDRESS, API_PORT, REQUEST_CATALOGUE } from '../app.constantes';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  constructor(private http: HttpClient) { }

  public getCatalogueAll(catalogue: String): Observable<any> {
    let request = API_ADDRESS + API_PORT + REQUEST_CATALOGUE + catalogue;
    console.log(request);
    return this.http.get(request, { headers: {'Content-Type': 'application/json'} });
  }

  public getCatalogueObjectByName(catalogue: String, name: String): Observable<any> {
    let request = API_ADDRESS + API_PORT + REQUEST_CATALOGUE + catalogue + '/' + name;
    console.log(request);
    return this.http.get(request, { headers: {'Content-Type': 'application/json'} });
  }
}
