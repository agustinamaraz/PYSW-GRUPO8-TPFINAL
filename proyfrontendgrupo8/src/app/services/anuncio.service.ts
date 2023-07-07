import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anuncio } from '../models/anuncio';
import { Observable } from 'rxjs';
import { Recurso } from '../models/recurso';
@Injectable({
  providedIn: 'root'
})
export class AnuncioService {
  urlBase: string = "http://localhost:3000/api/anuncio/"
  constructor(private _http: HttpClient) { }
  addAnuncio(anuncio: Anuncio): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),
      params: new HttpParams()
    };
    const body = JSON.stringify(anuncio);

    return this._http.post(this.urlBase, body, httpOptions);

  }
  getAnuncios():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams()
    };

    return this._http.get(this.urlBase , httpOptions);
  }
  editAnuncio(id: string , anuncio :Anuncio):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),
      params: new HttpParams()
    };
    const body = JSON.stringify(anuncio);

    return this._http.put(this.urlBase + id, body, httpOptions);
  }
  getAnuncioId(id: string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams()
    };

    return this._http.get(this.urlBase + id, httpOptions);
  }
  deleteAnuncio(id:string):Observable<any>{
    

    const httpOptions = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams()
    };

    return this._http.delete(this.urlBase + id, httpOptions);
  }
  /////////////////recurso
  addRecurso(id : string ,recurso :Recurso):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),
      params: new HttpParams()
    };
    const body = JSON.stringify(recurso);

    return this._http.post(this.urlBase + id + "/recurso" , body, httpOptions);
  }
  deleteRecurso(idanuncio:string , idrecurso : string ):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams()
    };

    return this._http.delete(this.urlBase +idanuncio+"/recurso/" + idrecurso, httpOptions);

  }
}
