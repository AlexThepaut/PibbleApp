import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ADDRESS, API_PORT, REQUEST_SETUP, REQUEST_SETUP_INIT, REQUEST_SETUP_POINT, REQUEST_SETUP_RESET, REQUEST_SETUP_VALIDATE, REQUEST_INFOS } from '../app.constantes';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  constructor(private http: HttpClient) { }
  
  public getInitSetup(): Observable<any> {
    let req = API_ADDRESS + API_PORT + REQUEST_SETUP + REQUEST_SETUP_INIT;
    return this.http.get(req, { headers: { 'Content-Type': 'application/json' }});
  }

  public getPointSetup(number: number, starId: String): Observable<any> {
    let req = API_ADDRESS + API_PORT + REQUEST_SETUP + REQUEST_SETUP_POINT;

    const params = new HttpParams()
      .append('star', starId != null ? starId.toString() : '')
      .append('numbrer', number.toString());

    return this.http.get(req, { headers: { 'Content-Type': 'application/json' }, params: params});
  }

  public getResetSetup(): Observable<any> {
    let req = API_ADDRESS + API_PORT + REQUEST_SETUP + REQUEST_SETUP_RESET;
    return this.http.get(req, { headers: { 'Content-Type': 'application/json' }});
  }

  public getValidateSetup(): Observable<any> {
    let req = API_ADDRESS + API_PORT + REQUEST_SETUP + REQUEST_SETUP_VALIDATE;
    return this.http.get(req, { headers: { 'Content-Type': 'application/json' }});
  }

  public getInfos(): Observable<any> {
    let req = API_ADDRESS + API_PORT + REQUEST_INFOS;
    return this.http.get(req, { headers: { 'Content-Type': 'application/json' }});
  }
}
