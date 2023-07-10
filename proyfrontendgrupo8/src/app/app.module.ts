import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component'; //usado para el login
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';

import { PacienteComponent } from './components/paciente/paciente.component';
import { PacienteFormComponent } from './components/paciente-form/paciente-form.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { CalendarComponent } from './components/calendar/calendar.component';

//toast
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DatosmedicosFormComponent } from './components/datosmedicos-form/datosmedicos-form.component';
import { DatosmedicosLisComponent } from './components/datosmedicos-lis/datosmedicos-lis.component';

//fecha
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { SearchPipe } from './search.pipe';
import { DatosMedicosHomeComponent } from './components/datos-medicos-home/datos-medicos-home.component';
import { SignupComponent } from './components/signup/signup.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { FormAnuncioComponent } from './components/form-anuncio/form-anuncio.component';
import { ListAnuncioComponent } from './components/list-anuncio/list-anuncio.component';
import { ListAnuncioClienteComponent } from './components/list-anuncio-cliente/list-anuncio-cliente.component';
import { AnuncioComponent } from './components/anuncio/anuncio.component';
import { FormcontactoComponent } from './components/formcontacto/formcontacto.component';
import { ListContactoComponent } from './components/list-contacto/list-contacto.component';
import { EspecialistaComponent } from './components/especialista/especialista.component';
import { EspecialistaFormComponent } from './components/especialista-form/especialista-form.component';




registerLocaleData(localeEsAr);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    PacienteComponent,
    PacienteFormComponent,
    DatosmedicosFormComponent,
    DatosmedicosLisComponent,
    CalendarComponent,
    SearchPipe,
    DatosMedicosHomeComponent,
    SignupComponent,
    ConfirmComponent,
    ResetpasswordComponent,
    FormAnuncioComponent,
    ListAnuncioComponent,
    ListAnuncioClienteComponent,
    AnuncioComponent,
    FormcontactoComponent,
    ListContactoComponent,
    EspecialistaComponent,
    EspecialistaFormComponent
  ],
  imports:[
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OAuthModule.forRoot(),


    //toast
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule,

    ToastrModule.forRoot({ //agregado agus 4/7/2023
      positionClass :'toast-bottom-right'
    })
  ],

  providers:
    [
      { provide: LOCALE_ID, useValue: 'es-AR' },
      DatePipe,
    ],

  bootstrap: [AppComponent]
})
export class AppModule {}
