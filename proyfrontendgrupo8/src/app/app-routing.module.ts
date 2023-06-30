import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { PacienteFormComponent } from './components/paciente-form/paciente-form.component';
import { DatosmedicosFormComponent } from './components/datosmedicos-form/datosmedicos-form.component';
import { CalendarComponent } from './components/calendar/calendar.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'home',
    component: HomeComponent
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
    path:'datosMedicos-form',
    component:DatosmedicosFormComponent
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
