import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Turno } from '../models/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  hostBase: string;
  constructor(private http: HttpClient) {
    this.hostBase = "http://localhost:3000/api/turno/";
  }

  getTurno(id: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()

    }

    return this.http.get(this.hostBase + id, httpOptions);

  }


  getTurnos(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()

    }

    return this.http.get(this.hostBase, httpOptions);

  }
  
  createTurno(t: Turno): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders(
        {
          "Content-type": "application/json"
        }
      ),
      params: new HttpParams()
    }

    let body = JSON.stringify(t);

    return this.http.post(this.hostBase, body, httpOptions);
  }

  deleteTurno(id: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()
    }

    return this.http.delete(this.hostBase + id, httpOptions);
  }

  editTurno(t: Turno): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders(
        {
          "Content-type": "application/json"
        }
      ),
      params: new HttpParams()
    }

    let body = JSON.stringify(t);

    return this.http.put(this.hostBase + t._id, body, httpOptions);
  }

}
