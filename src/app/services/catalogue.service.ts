import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ADDRESS, API_PORT, REQUEST_CATALOGUE, REQUEST_CATALOGUE_OBJECTS_TYPES, REQUEST_CATALOGUE_CONSTELATIONS, REQUEST_CATALOGUE_EPHEMERIDES } from '../app.constantes';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  constructor(private http: HttpClient) { }

  public getCatalogueAllWithFilter(catalogue: String, magnitude: String, constelation: String, type: String, visible: String): Observable<any> {
    let request = API_ADDRESS + API_PORT + REQUEST_CATALOGUE + '/' + catalogue;
    console.log(request);

    const params = new HttpParams()
      .append('magnitude', magnitude != null ? magnitude.toString() : '')
      .append('constellation', constelation != null ? constelation.toString() : '')
      .append('type', type != null ? type.toString() : '')
      .append('visible', visible != null ? visible.toString() : '');

    let req = this.http.get(request, { headers: { 'Content-Type': 'application/json' }, params: params});
    console.log(req);
    return req;
  }

  public getCatalogueByName(catalogue: String, name: String): Observable<any> {
    let request = API_ADDRESS + API_PORT + REQUEST_CATALOGUE + '/' + catalogue + '/' + name;
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

  public addObjectInCatalogue(object: Object): Observable<any> {
    let request = API_ADDRESS + API_PORT + REQUEST_CATALOGUE;
    console.log(request);
    return this.http.post(request, object, { headers: { 'Content-Type': 'application/json' } });
  }

  public getEphemerides(): Observable<any> {
    let request = API_ADDRESS + API_PORT + REQUEST_CATALOGUE + REQUEST_CATALOGUE_EPHEMERIDES;
    console.log(request);
    return this.http.get(request, { headers: { 'Content-Type': 'application/json' } });
  }
}
