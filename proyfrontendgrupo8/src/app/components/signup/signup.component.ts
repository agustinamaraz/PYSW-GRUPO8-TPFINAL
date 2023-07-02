import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  usuario!:Usuario;
  roles!:Array<Rol>;
  modifica:boolean=false
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
  onChangeOptions(rol:Rol){
    console.log(rol._id)
  }
  createUser(){
    console.log(this.usuario.rol.descripcion +  '  '+ JSON.stringify(this.usuario.rol))
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
}
