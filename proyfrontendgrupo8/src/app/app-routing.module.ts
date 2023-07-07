import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
<<<<<<< Updated upstream

=======
import { PacienteComponent } from './components/paciente/paciente.component';
import { PacienteFormComponent } from './components/paciente-form/paciente-form.component';
import { DatosmedicosFormComponent } from './components/datosmedicos-form/datosmedicos-form.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DatosmedicosLisComponent } from './components/datosmedicos-lis/datosmedicos-lis.component';
import { DatosMedicosHomeComponent } from './components/datos-medicos-home/datos-medicos-home.component';
import { SignupComponent } from './components/signup/signup.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { VigilanteGuard } from './vigilante.guard';
import { FormAnuncioComponent } from './components/form-anuncio/form-anuncio.component';
import { ListAnuncioComponent } from './components/list-anuncio/list-anuncio.component';
>>>>>>> Stashed changes
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
    path:'',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path:'form-anuncio/:id',component:FormAnuncioComponent,
    data:{
      rol: 'administrador'
    },
    canActivate:[VigilanteGuard]
  },
  {
    path:'list-anuncio',component:ListAnuncioComponent,
    data:{
      rol: 'administrador'
    },
    canActivate:[VigilanteGuard]
  },
  /*{path:'form-anuncio/:id',component:FormAnuncioComponent},
   {path:'list-anuncio',component:ListAnuncioComponent}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
