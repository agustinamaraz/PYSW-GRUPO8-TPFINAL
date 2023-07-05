import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { PacienteFormComponent } from './components/paciente-form/paciente-form.component';
import { DatosmedicosFormComponent } from './components/datosmedicos-form/datosmedicos-form.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DatosmedicosLisComponent } from './components/datosmedicos-lis/datosmedicos-lis.component';
import { DatosMedicosHomeComponent } from './components/datos-medicos-home/datos-medicos-home.component';
import { SignupComponent } from './components/signup/signup.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'signUp/:id',
    component:SignupComponent
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'reset/:id',
    component:ResetpasswordComponent
  },
  { 
    path:'paciente',
    component:PacienteComponent
  },
  {
    path:'paciente-form/:id',
    component:PacienteFormComponent
  },
  {
    path:'datosMedicos-form/:id',
    component:DatosmedicosFormComponent
  },
  {
    path:'datosMedicos',
    component:DatosmedicosLisComponent
  },
  {
    path:'datosMedicosHome/:id',
    component:DatosMedicosHomeComponent
  },
  {
    path:'confirm/:id',
    component:ConfirmComponent
  },
  {
    path:'calendar',
    component:CalendarComponent
  },
  //lo siguiente siempre va al final
  {
    path:'**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
