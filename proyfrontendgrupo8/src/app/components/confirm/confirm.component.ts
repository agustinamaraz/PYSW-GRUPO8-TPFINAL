import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  id!:string
  constructor(private usuarioService: LoginService, private activatedRoute:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] != '0') {
        this.id = params['id'];
        console.log(this.id)
      }
    });
  }
  confirm(){
    this.usuarioService.confirm(this.id).subscribe(
      result=>{
        console.log(result)
        alert("Cuenta Confirmada")
        this.router.navigate(["home"])
      },
      error=>{

      }
    )
  }
}
