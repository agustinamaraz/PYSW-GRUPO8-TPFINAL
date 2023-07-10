import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  password!:string;
  id!:string;
  returnUrl!:string;
  email!:string;
  notFound!:boolean;
  form:boolean=false;
  constructor(private loginService:LoginService, private activatedRoute: ActivatedRoute, private route:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] != '0') {
        this.id = params['id'];
        this.form = true;
        console.log(this.id)
      }
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/home';
  }
  resetAsk(){
    console.log(this.email)
    this.loginService.resetAsk(this.email).subscribe(
      result=>{
        console.log(result);
        this.returnUrl;
        // setTimeout(() => {
        //   window.location.reload(); // Recargar la página actual
        // }, 5000);
      },
      error=>{
        console.log(error)
        if (error.status === 499) {
          this.notFound = true;
          let myDiv = document.getElementById('errorEmail')!;
          if (myDiv) {
            myDiv.style.display = 'block';
            setTimeout(() => {
              myDiv.style.display = 'none';
            }, 3000);
          }
        }
      }
    )
  }


  reset(){
    console.log(this.id);
    console.log(this.password);
    this.loginService.resetPassword(this.password, this.id).subscribe(
      result=>{
        console.log(result)
        alert("contraseña restablecida correctamente")
      },
      error=>{
        console.log(error)
      }
    )
  }
}
