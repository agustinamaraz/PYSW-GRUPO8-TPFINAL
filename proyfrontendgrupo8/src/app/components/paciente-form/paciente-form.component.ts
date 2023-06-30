import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css']
})
export class PacienteFormComponent implements OnInit {

  paciente = new Paciente();
  accion: string="";

  constructor(private pacienteService: PacienteService, private activatedRoute: ActivatedRoute, 
    private router: Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        
        if (params['id'] == '0') {
          this.accion = "new";
        } else {
          this.accion = "update";
          this.cargarPaciente(params['id']);
        }
      }
    )
  }

  
  cargarPaciente(id: string) {
    this.pacienteService.getPaciente(id).subscribe(
      (result) => {
        Object.assign(this.paciente, result);
        console.log(result);
      },
      error => {
        console.log(error);
      }
    )
  }

  guardarPaciente() {
    console.log(this.paciente);
    this.pacienteService.createPaciente(this.paciente).subscribe(
      result => {
        if (result.status == 1) {
          this.toastr.success('Paciente agregado correctamente','Paciente Agregado')
          this.router.navigate(["paciente"])
        }
      },
      error => {
        alert(error.msg);
      }
    )


  }


  modificarPaciente() {
    this.pacienteService.editPaciente(this.paciente).subscribe(
      result => {
        if (result.status == 1) {
          this.toastr.success('Paciente Modificado Correctamente')
          this.router.navigate(["paciente"])
        }
      },
      error => {
        alert(error.msg);
      }
    )
  }

  public cancelar() {
    this.router.navigate(["paciente"]);
  }

}
