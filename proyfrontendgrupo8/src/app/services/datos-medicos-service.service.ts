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

    //this.urlBase = "http://3.82.255.160:3000/api/datosMedicos/";

    this.urlBase = "http://localhost:3000/api/datosMedicos/";
  }
  addDatosMedicos(motivo:string, pacienteId:string, fecha:string, peso:number, 
    imc:number, talla:number, tension_arterial:number, diagnostico:string):Observable<any>{
    const dataMedic = {
      motivo:motivo,
      paciente:pacienteId,
      fecha:fecha,
      peso:peso,
      imc:imc,
      talla:talla,
      tension_arterial:tension_arterial,
      diagnostico:diagnostico
    }
      let httpOptions={
      headers: new HttpHeaders(
        {
          "Content-type": "application/json"
        }
      ),
      params: new HttpParams()
    }
    let body = JSON.stringify(dataMedic);
    return this._http.post(this.urlBase, body, httpOptions)
  }
  editDatosMedicos(id:string,motivo:string, pacienteId:string, fecha:string, peso:number, 
    imc:number, talla:number, tension_arterial:number, diagnostico:string):Observable<any>{
    const dataMedic = {
      motivo:motivo,
      paciente:pacienteId,
      fecha:fecha,
      peso:peso,
      imc:imc,
      talla:talla,
      tension_arterial:tension_arterial,
      diagnostico:diagnostico
    }
      let httpOptions={
      headers: new HttpHeaders(
        {
          "Content-type": "application/json"
        }
      ),
      params: new HttpParams()
    }
    let body = JSON.stringify(dataMedic);
    return this._http.put(this.urlBase+id, body, httpOptions)
  }
  getDatosMedicos():Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
          {

          }
        ),
      params: new HttpParams() 
    }
    return this._http.get(this.urlBase,httpOptions)
  }
  getDatosMedicosDNI(dni:string):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
          {

          }
        ),
      params: new HttpParams() 
    }
    return this._http.get(this.urlBase+'dni/'+dni,httpOptions)
  }
  getDatosMedicosId(id:string):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
          {

          }
        ),
      params: new HttpParams() 
    }
    return this._http.get(this.urlBase+id, httpOptions)
  }
  deleteDatosMedicos(id:string):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
          {

          }
        ),
      params: new HttpParams() 
    }
    return this._http.delete(this.urlBase+id,httpOptions)
  }
}
