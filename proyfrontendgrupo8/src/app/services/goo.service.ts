import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { authCodeFlowConfig } from './../sso.config';
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
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.initCodeFlow();
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
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      params: new HttpParams({}),
    };
    let body = JSON.stringify(event);
    console.log(body);
    return this._http.post(
      'https://www.googleapis.com/calendar/v3/calendars/' +
        idCalendario +
        '/events',
      body,
      httpOptions
    );
  }
  getToken(): string {
    return this.oAuthService.getAccessToken();
  }
}
