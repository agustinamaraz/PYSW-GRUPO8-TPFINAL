import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { LoginComponent } from './components/login/login.component'; //usado para el login
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { PacienteComponent } from './components/paciente/paciente.component';
import { PacienteFormComponent } from './components/paciente-form/paciente-form.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { CalendarComponent } from './components/calendar/calendar.component';

//toast
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    PacienteComponent,
    PacienteFormComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OAuthModule.forRoot(),
<<<<<<< HEAD
    //toast
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()// ToastrModule added
=======
    ToastrModule.forRoot()
>>>>>>> 36a2d18fd684b79de16be7f70f2993a52afeaa89
  ],
  providers: [
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
<<<<<<< HEAD
    }
=======
    },
    CommonModule,
    BrowserAnimationsModule, // required animations module
    // ToastrModule added
>>>>>>> 36a2d18fd684b79de16be7f70f2993a52afeaa89
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
