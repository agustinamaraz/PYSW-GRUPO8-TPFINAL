import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  usuario!:Usuario;
  roles!:Array<Rol>;
  returnUrl!:string;
  returnUrlLogin!:string
  modifica:boolean=false;
  repeatedEmail!:boolean;
  repeatedUsername!:boolean;
  loadPassword:boolean=false;
  loadEmail:boolean=false;
  loadUsername:boolean=false;
  id:string=""
  selectedRole!:Rol
  constructor(private usuarioService:LoginService, private activatedRoute:ActivatedRoute, private route:Router) { 
    this.usuario = new Usuario();
    this.roles = new Array<Rol>();
  }
  ngOnInit(): void {
    this.getRoles()
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == '0') {
        this.modifica = false;
      } else {
        this.modifica = true;
        this.id = params['id'];
        console.log(this.modifica)
      }
    });
    // setTimeout(() => {
    //   this.initializeForm();
    // });
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/home';
    this.returnUrlLogin = this.activatedRoute.snapshot.queryParams['returnUrlLogin'] || '/login'
  }
  onSubmit(){

  }

  getRoles(){
    this.usuarioService.getRoles().subscribe(
      result=>{
        console.log(result, result[0]._id);
        this.roles = result

      },
      error=>{
        console.log(error)
      }
    )
  }
  
  esAdministrador(){
    return this.usuarioService.esAdmin();
  }
  onChangeOptions(rol:Rol){
    console.log(rol._id)
  }
  createUser(){
    console.log(this.usuario.rol.descripcion +  '  '+ JSON.stringify(this.usuario.rol))
    if(!this.esAdministrador()){
      this.usuario.rol._id = '649de3a7583b9ab931caaa6c'
    }
    this.usuarioService.signUp(this.usuario.username, this.usuario.password, this.usuario.email, this.usuario.rol._id).subscribe(
      result=>{
        console.log(result);
        alert('Registrado correctamente')
        this.login();
      },
      error=>{
        console.log(error);
        if (error.error.message === 'Este email ya está en uso') {
          console.log("Este email ya fue registrado");
          this.usuario.email="";
          this.usuario.password="";
          this.usuario.dni=""
          this.repeatedEmail=true;
          [this.loadPassword, this.loadEmail] = [true, true];
        }
        if (error.error.message === 'Este nombre de usuario ya está en uso') {
          console.log("Este nombre de usuario ya fue registrado");
          this.usuario.username="";
          this.usuario.password="";
          this.usuario.dni=""
          this.repeatedUsername=true;
          [this.loadPassword, this.loadUsername] = [true, true];
        }
        if (error.status==448) {
          console.log("Tanto el email como el nombre de usuario ya estan registrados");
          this.usuario.email="";
          this.usuario.username="";
          this.usuario.password="";
          this.usuario.dni=""
          this.repeatedEmail=true;
          this.repeatedUsername=true;
          [this.loadPassword, this.loadEmail, this.loadUsername] = [true, true, true];

        }
      }
    )
  }
  login() {
    this.usuarioService.login(this.usuario.username, this.usuario.password)
      .subscribe(
        result=>{
          var user = result;
          if (user.status == 1) {
            //guardamos el user en cookies en el cliente
            sessionStorage.setItem("usuario", JSON.stringify(user));
            sessionStorage.setItem("token", user.token);
            sessionStorage.setItem("user", user.username);
            sessionStorage.setItem("userid", user.userid);
            sessionStorage.setItem("rol", JSON.stringify(user.rol));
            sessionStorage.setItem("dni",user.dni)
            //redirigimos a home o a pagina que llamo
            this.route.navigateByUrl(this.returnUrl);
          }
        },
        error => {
          alert("Error de conexion");
          console.log("error en conexion");
          console.log(error);
        });
  }
  modifyUser(){
    this.usuarioService.signUp(this.usuario.username, this.usuario.password, this.usuario.email, this.usuario.rol._id).subscribe(
      result=>{
        console.log(result);
        alert('Registrado correctamente')
      },
      error=>{
        console.log(error);
        alert('No pudo ser registrado')
      }
    )
  }
  loginGo(){
    this.route.navigateByUrl(this.returnUrlLogin)
  }
}
