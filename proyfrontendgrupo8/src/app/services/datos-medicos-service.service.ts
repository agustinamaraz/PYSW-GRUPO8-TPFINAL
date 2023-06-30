import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosMedicos } from '../models/datos-medicos';

@Injectable({
  providedIn: 'root'
})
export class DatosMedicosServiceService {
  urlBase:string
  constructor(private _http: HttpClient) { 
    this.urlBase = "http://localhost:3000/api/datosMedicos/";
  }
  addDatosMedicos(datosMedicos: DatosMedicos):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
        {
          "Content-type": "application/json"
        }
      ),
      params: new HttpParams()
    }
    let body = JSON.stringify(datosMedicos);
    return this._http.post(this.urlBase, body, httpOptions)
  }
}
