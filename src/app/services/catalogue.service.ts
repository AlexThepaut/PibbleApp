import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ADDRESS, API_PORT, REQUEST_CATALOGUE, REQUEST_CATALOGUE_OBJECTS_TYPES, REQUEST_CATALOGUE_CONSTELATIONS } from '../app.constantes';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  constructor(private http: HttpClient) { }

  public getCatalogueAllWithFilter(catalogue: String, magnitude: String, constelation: String, type: String): Observable<any> {
    let request = API_ADDRESS + API_PORT + REQUEST_CATALOGUE + catalogue;
    console.log(request);

    const params = new HttpParams()
      .append('magnitude', magnitude.toString())
      .append('constelation', constelation.toString())
      .append('type', type.toString());

    let req = this.http.get(request, { headers: { 'Content-Type': 'application/json' }, params: params});
    console.log(req);
    return req;
  }

  public getCatalogueByName(catalogue: String, name: String): Observable<any> {
    let request = API_ADDRESS + API_PORT + REQUEST_CATALOGUE + catalogue + '/' + name;
    console.log(request);
    return this.http.get(request, { headers: { 'Content-Type': 'application/json' } });
  }

  public getCatalogueObjectTypes(): Observable<any> {
    let request = API_ADDRESS + API_PORT + REQUEST_CATALOGUE_OBJECTS_TYPES;
    console.log(request);
    return this.http.get(request, { headers: { 'Content-Type': 'application/json' } });
  }

  public getCatalogueConstelations(catalogue: String): Observable<any> {
    let request = API_ADDRESS + API_PORT + '/' + catalogue + REQUEST_CATALOGUE_CONSTELATIONS;
    console.log(request);
    return this.http.get(request, { headers: { 'Content-Type': 'application/json' } });
  }
}
