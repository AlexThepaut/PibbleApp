import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { REQUEST_COMMAND_DIRECTION, REQUEST_COMMAND, API_PORT, API_ADDRESS, REQUEST_COMMAND_TRACK, REQUEST_POSITION, REQUEST_COMMAND_STOP } from '../app.constantes';
import { DeepSkyObject } from '../models/pibble-object.model';

@Injectable({
  providedIn: 'root'
})
export class RacketService {

  constructor(private http: HttpClient) { }

  public telescopeMove(direction: String, speed: number): Observable<any> {
    let request = API_ADDRESS + API_PORT + REQUEST_COMMAND + REQUEST_COMMAND_DIRECTION;
    console.log(request);

    const params = new HttpParams()
      .append('direction', direction.toString())
      .append('speed', speed.toString());
      
    return this.http.get(request, { headers: { 'Content-Type': 'application/json' }, params: params });
  }

  public telescopeTrack(): Observable<any> {
    let request = API_ADDRESS + API_PORT + REQUEST_COMMAND + REQUEST_COMMAND_TRACK;
    console.log(request);
    return this.http.get(request, { headers: { 'Content-Type': 'application/json' } });
  }

  public telescopeStop(): Observable<any> {
    let request = API_ADDRESS + API_PORT + REQUEST_COMMAND + REQUEST_COMMAND_STOP;
    console.log(request);
    return this.http.get(request, { headers: { 'Content-Type': 'application/json' } });
  }

  public telescopePosiion(): Observable<any> {
    let request = API_ADDRESS + API_PORT + REQUEST_POSITION;
    console.log(request);
    return this.http.get(request, { headers: { 'Content-Type': 'application/json' } });
  }

  public telescopeGoTo(type: String, id: Number): Observable<any> {
    let request = API_ADDRESS + API_PORT;
    console.log(request);
    return;
  }
}
