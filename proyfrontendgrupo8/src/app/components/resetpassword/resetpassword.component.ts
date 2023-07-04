import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  password!:string
  id!:string
  constructor(private loginService:LoginService, private activatedRoute: ActivatedRoute, private route:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] != '0') {
        this.id = params['id'];
        console.log(this.id)
      }
    });
  }
  reset(){
    console.log(this.id);
    console.log(this.password);
    this.loginService.resetPassword(this.password, this.id).subscribe(
      result=>{
        console.log(result)
        alert("contrasena reseteada correctamente")
      },
      error=>{
        console.log(error)
      }
    )
  }
}
