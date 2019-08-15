import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { REQUEST_CONNECTION, API_PORT, API_ADDRESS } from '../app.constantes';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: HttpClient) { }

  public getConnection(latitude: number, longitude: number, timestamp: number, offset: number): Observable<any> {
    let request = API_ADDRESS + API_PORT + REQUEST_CONNECTION;

    const params = new HttpParams()
      .append('latitude', latitude.toString())
      .append('longitude', longitude.toString())
      .append('timestamp', timestamp.toString())
      .append('offset', offset.toString());

    let req = this.http.get(request, { headers: { 'Content-Type': 'application/json' }, params: params});
    return req;
  }
}
