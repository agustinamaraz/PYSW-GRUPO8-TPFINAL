import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { parse } from 'path';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  hostBase: string;

  constructor(private http: HttpClient) {
    this.hostBase = "http://localhost:3000/api/usuario/"
  }
  public getRoles():Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
      })
    }
    return this.http.get('http://localhost:3000/api/rol/', httpOption)
  }
  public signUp(username:string, password:string, email:string, rol:string):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    console.log(JSON.stringify({ username: username, password: password, email:email, rol:rol }))
    let body = JSON.stringify({ username: username, password: password, email:email, rol:rol });
    return this.http.post(this.hostBase, body, httpOption)
  }
  public confirm(token:string){
    const httpOption = {
      headers: new HttpHeaders({
      })
    }
    return this.http.get('http://localhost:3000/api/usuario/confirm/'+token, httpOption)
  }
  public login(username: string, password: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify({ username: username, password: password });
    console.log(body);
    return this.http.post(this.hostBase + 'login', body, httpOption);
  }

  public logout() {
    //borro el vble almacenado mediante el storage
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("rol");
    sessionStorage.removeItem("userid");
    //borro el token almacenado mediante el storage
    sessionStorage.removeItem("token");
  }

  public userLoggedIn() {
    var resultado = false;
    var usuario = sessionStorage.getItem("user");
    if (usuario != null) {
      resultado = true;
    }
    return resultado;
  }

  public userLogged() {
    var usuario = sessionStorage.getItem("user");
    return usuario;
  }

  public getUser(){
    let isAdmin = sessionStorage.getItem("usuario");
    const parsedAdmin = isAdmin ? JSON.stringify(isAdmin) : null;

    return parsedAdmin;
  }

  public esAdmin(){ //funciona
    let isAdmin = sessionStorage.getItem("usuario");
    const parsedAdmin = isAdmin ? JSON.parse(isAdmin) : null;
    if(parsedAdmin && parsedAdmin.rol && parsedAdmin.rol.descripcion === "administrador"){
        return true;
    }
    return false;
  }

  public idLogged() {
    var id = sessionStorage.getItem("userid");
    return id;
  }

  public getUserStatus(): boolean {
    const user = sessionStorage.getItem("user");
    if (user) {
      const status = JSON.parse(user).status;
      return status === "VERIFIED";
    } else {
      return false;
    }
  }
  //seguridad
  getToken(): string {
    if (sessionStorage.getItem("token") != null) {
      return sessionStorage.getItem("token")!;
    } else {
      return "";
    }
  }
  resetPassword(password:string, token:string){
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify({password: password });
    console.log(body);
    return this.http.post(this.hostBase + 'reset/'+token, body, httpOption);
  }

}
