import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ADDRESS, API_PORT, REQUEST_CATALOGUE_ALL, REQUEST_CATALOGUE_ONJECT_BYNAME } from '../app.constantes';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  constructor(private http: HttpClient) { }

  public getCatalogueAll(): Observable<any> {
    return this.http.get(API_ADDRESS + API_PORT + REQUEST_CATALOGUE_ALL);
  }

  public getCatalogueObjectByName(name: String): Observable<any> {
    // name = name.replace(" ", "%");
    console.log(API_ADDRESS + API_PORT + REQUEST_CATALOGUE_ONJECT_BYNAME + name);
    return this.http.get(API_ADDRESS + API_PORT + REQUEST_CATALOGUE_ONJECT_BYNAME + name, { headers: {'Content-Type': 'application/json'} });
  }
}
