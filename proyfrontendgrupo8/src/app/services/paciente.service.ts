import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http:HttpClient) { }

  getPaciente(id:string):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()

    }

    return this.http.get("http://localhost:3000/api/paciente/"+id,httpOptions);
  }

  //todos los pacientes
  getPacientes():Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()

    }

    return this.http.get("http://localhost:3000/api/paciente/",httpOptions);
  }
  //paciente por dni
  getPacienteDni(dni:string):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()
      .append("dniP",dni)
    }

    return this.http.get("http://localhost:3000/api/paciente/dni",httpOptions);
  }
  getOnePacienteByDni(dni:string):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
        {
          
        }
      ),
      params: new HttpParams()
    }
    return this.http.get('http://localhost:3000/api/paciente/dniOne/'+dni, httpOptions)
  }
  getPacienteById(id:string):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()

    }

    return this.http.get("http://localhost:3000/api/paciente/"+id,httpOptions);
  }
  createPaciente(paciente:Paciente):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
        {
          "Content-type": "application/json"
        }
      ),
      params: new HttpParams()
    }

    let body = JSON.stringify(paciente);
    
    return this.http.post("http://localhost:3000/api/paciente",body,httpOptions);
  }

  deletePaciente(id:string):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()
    }

    return this.http.delete("http://localhost:3000/api/paciente/"+id,httpOptions);
  }

  editPaciente(paciente:Paciente):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders(
        {
          "Content-type": "application/json"
        }
      ),
      params: new HttpParams()
    }

    let body = JSON.stringify(paciente);

    return this.http.put("http://localhost:3000/api/paciente/"+paciente._id,body,httpOptions);
  }
}
