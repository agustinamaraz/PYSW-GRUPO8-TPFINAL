import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { authCodeFlowConfig } from './../sso.config';
import { Console } from 'console';
//import { LoginService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class GooService {
  //private loginService: LoginService
  constructor(
    private _http: HttpClient,
    private readonly oAuthService: OAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private injector: Injector
  ) {
    //this.loginService = this.injector.get(LoginService);
  }
  configureSingleSignOne() {
    // this.oAuthService.configure(authCodeFlowConfig);
    // this.oAuthService.loadDiscoveryDocumentAndTryLogin(); estas dos lineas solitas estaban antes 10/7/2023

    let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

    this.oAuthService.configure(authCodeFlowConfig);
    //this.oAuthService.loadDiscoveryDocumentAndTryLogin();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(
      ()=>{
        if(this.oAuthService.hasValidAccessToken()){
          this.oAuthService.loadUserProfile().then((userProfile)=>{
            let usuarioPerfil:any= userProfile;
            console.log(usuarioPerfil.info.email);
            let rol = "visitante";
            let name = this.cortarStringPorEspacio(usuarioPerfil.info.name)
            sessionStorage.setItem("username", name)
            sessionStorage.setItem("rol", rol)
            sessionStorage.setItem('googleIsLoggedIn', 'true')
            console.log(sessionStorage.getItem('googleIsLoggedIn'))
            sessionStorage.setItem('emailGmail',usuarioPerfil.info.email)
            //ya tengo el email de quien se logueo puedo 
            //llamar desde aqui al loginService.login() para buscar el email en 
            //la bd y si corresponde para guardar
            //las credenciales de la persona que se esta logueando
            //idem de como se lo llama desde el controler de loguin
            // this.loginService.loginEmailGoogle(usuarioPerfil.getEmail()).subscribe(
            //   result=>{
            //     console.log(result)
            //     this.router.navigateByUrl(returnUrl);
            //   },
            //   error=>{
            //     console.log(error)
            //     this.router.navigateByUrl(returnUrl);
            //   }
            // )
          })
        }
      }
    )
  }
  login() {
    console.log("AAAAAAAAAAA")
    this.oAuthService.setupAutomaticSilentRefresh();
    console.log("AAAAAAAAAAA2")
    this.oAuthService.initCodeFlow();
    console.log("AAAAAAAAAAA2=3")
  }
  public getEmailGoogle():string{
    let email = sessionStorage.getItem("emailGmail")
    return email;
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
    console.log('LogginOut')
    this.oAuthService.logOut();
    sessionStorage.clear();
    console.log(sessionStorage.length)
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
