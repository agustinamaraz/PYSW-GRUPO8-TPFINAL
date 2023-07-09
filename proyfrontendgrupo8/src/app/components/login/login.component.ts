import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userform: Usuario = new Usuario(); //usuario mapeado al formulario
  returnUrl!: string;
  resetUrl!:string;
  msglogin!: string; // mensaje que indica si no paso el loguin
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService) {
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/reset';
  }
  verificarTexto(texto:any):boolean {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (emailRegex.test(texto)) {
      console.log('El texto ingresado corresponde a un email');
      return true;
    } else {
      console.log('El texto ingresado corresponde a un texto normal');
      return false;
    }
  }
  login() {
    if(!this.verificarTexto(this.userform.username)){
    this.loginService.login(this.userform.username, this.userform.password)
      .subscribe(
        (result) => {
          var user = result;
          console.log("usuarioooooooooooooooooooooooLOGIN"+JSON.stringify(result)
          );
          if (user.status == 1) {
            console.log(user.usuario.dni)
            //guardamos el user en cookies en el cliente
            sessionStorage.setItem("usuario", JSON.stringify(user));
            sessionStorage.setItem("token", user.token);
            sessionStorage.setItem("user", user.username);
            sessionStorage.setItem("userid", user.userid);
            sessionStorage.setItem("rol", JSON.stringify(user.rol));
            sessionStorage.setItem("userDni",user.usuario.dni);
            //redirigimos a home o a pagina que llamo
            this.router.navigateByUrl(this.returnUrl);
          } else {
            //usuario no encontrado muestro mensaje en la vista
            this.msglogin = "Credenciales incorrectas..";
          }
        },
        error => {
          alert("Error de conexion");
          console.log("error en conexion");
          console.log(error);
        });
  }
  else if(this.verificarTexto(this.userform.username)){
    this.loginService.loginEmail(this.userform.username, this.userform.password)
      .subscribe(
        (result) => {
          var user = result;
          console.log("usuarioooooooooooooooooooooooLOGIN"+JSON.stringify(result)
          );
          if (user.status == 1) {
            console.log(user.usuario.dni)
            //guardamos el user en cookies en el cliente
            sessionStorage.setItem("usuario", JSON.stringify(user));
            sessionStorage.setItem("token", user.token);
            sessionStorage.setItem("user", user.username);
            sessionStorage.setItem("userid", user.userid);
            sessionStorage.setItem("rol", JSON.stringify(user.rol));
            sessionStorage.setItem("userDni",user.usuario.dni);
            //redirigimos a home o a pagina que llamo
            this.router.navigateByUrl(this.returnUrl);
          } else {
            //usuario no encontrado muestro mensaje en la vista
            this.msglogin = "Credenciales incorrectas..";
          }
        },
        error => {
          alert("Error de conexion");
          console.log("error en conexion");
          console.log(error);
        });

  }
}
  signup(){
    this.router.navigate(['signUp',0]);
  }
}
