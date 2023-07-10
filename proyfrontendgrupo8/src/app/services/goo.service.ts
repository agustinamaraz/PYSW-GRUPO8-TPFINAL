import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { authCodeFlowConfig } from './../sso.config';
import { Console } from 'console';
@Injectable({
  providedIn: 'root',
})
export class GooService {
  constructor(
    private _http: HttpClient,
    private readonly oAuthService: OAuthService
  ) {}
  configureSingleSignOne() {
    this.oAuthService.configure(authCodeFlowConfig);
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }
  login() {
    console.log("AAAAAAAAAAA")
    this.oAuthService.setupAutomaticSilentRefresh();
    console.log("AAAAAAAAAAA2")
    this.oAuthService.initCodeFlow();
    console.log("AAAAAAAAAAA2=3")
    console.log(this.oAuthService.loadUserProfile());
        console.log(this.oAuthService.hasValidAccessToken());
  setTimeout(() => {
    if (this.oAuthService.hasValidAccessToken()) {
      this.oAuthService.loadUserProfile()
      .then((userProfile:any) => {
        let profile = userProfile.getBasicProfile();
        console.log('Token || ' + userProfile.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        let rol = "visitante";
        let name = this.cortarStringPorEspacio(profile.getName());
        sessionStorage.setItem("username", name);
        sessionStorage.setItem("rol", rol);
        sessionStorage.setItem('googleIsLoggedIn', 'true');
        console.log(sessionStorage.getItem('googleIsLoggedIn'));
      });
    }
  }, 1000);
  }
  
  cortarStringPorEspacio(texto: string): string {
    const indiceEspacio = texto.indexOf(' ');
    if (indiceEspacio !== -1) {
      return texto.substring(0, indiceEspacio);
    } else {
      return texto;
    }
  }
  logout() {
    this.oAuthService.logOut();
  }
  getEvents(idCalendario: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getToken(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      params: new HttpParams({}),
      //.append("key", "AIzaSyBVDwmGSiRaIoHqpsl9KfnmhfY8Vd34asd")
    };
    console.log(httpOptions);
    return this._http.get(
      'https://www.googleapis.com/calendar/v3/calendars/' +
        idCalendario +
        '/events',
      httpOptions
    );
  }

  createEvent(idCalendario: string, event: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getToken(),
        Accept: 'application/ecmascript',
        'Content-Type': 'application/json',
      }),
      params: new HttpParams({}),
    };

    let body = JSON.stringify(event);

    console.log("consumiento createEventCalendariooooo: "+body+"\n");

    //https://www.googleapis.com/calendar/v3/calendars/calendarId/events
    return this._http.post('https://www.googleapis.com/calendar/v3/calendars/' + idCalendario +'/events',body,httpOptions);
  }

  getToken(): string {
    return this.oAuthService.getAccessToken();
  }
  async checkIfGoogleAccountLinked(): Promise<boolean> {
    // Verificar si el usuario tiene un token de acceso válido
    if (this.oAuthService.hasValidAccessToken()) {
      try {
        // Obtener el perfil del usuario actualizado
        try{
          console.log(this.oAuthService.getIdentityClaims())
        const userProfile = await this.oAuthService.loadUserProfile();
        console.log(userProfile)
        }catch(error){
          console.log(error)
        }
          return true;
      } catch (error) {
        console.error('Error al cargar el perfil del usuario:', error);
      }
    }
  
    return false;
  }
}
