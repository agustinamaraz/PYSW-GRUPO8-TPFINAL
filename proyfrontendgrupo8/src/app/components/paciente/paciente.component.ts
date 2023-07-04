import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  pacientes:Array<Paciente>;
  pacienteDni:Array<Paciente>;
  dni!:string;
  constructor(private pacienteService: PacienteService, private activatedRoute: ActivatedRoute, 
    private router: Router, private toastr:ToastrService) { 
      this.pacientes = new Array<Paciente>();
      this.pacienteDni= new Array<Paciente>();
      this.obtenerPacientes();
    }

  ngOnInit(): void {
  }

  
  obtenerPacientes(){
    console.log("entrando a obtener pacientes")
    this.pacienteService.getPacientes().subscribe(
      result=>{
        let unPaciente = new Paciente();
        result.forEach((element:any) => {
          Object.assign(unPaciente,element);
          this.pacientes.push(unPaciente);
          unPaciente = new Paciente();
        });
      },
      error=>{
        console.log(error);
      }
    )
  }


  obtenerPacienteDni(){
    console.log("ENTRANDO A PACIENTE POR DNI");
    this.pacientes=new Array<Paciente>();
    this.pacienteService.getPacienteDni(this.dni).subscribe(
      result=>{
        this.pacienteDni=result;
        let unPaciente = new Paciente();
        result.forEach((element:any) => {
          Object.assign(unPaciente,element);
          this.pacientes.push(unPaciente);
          unPaciente = new Paciente();
        });
      },
      error=>{
        alert(error);
      }
    )
  }

  eliminarPaciente(paciente:Paciente){
    this.pacienteService.deletePaciente(paciente._id).subscribe(
      result=>{
        if(result.status == 1){
          this.toastr.warning('Paciente eliminado correctamente','Paciente Eliminado')
          window.location.reload();
        }
      },
      error=>{
        alert(error.msg);
      }
    )
  }

  modificarPaciente(paciente:Paciente){
    console.log(paciente);
    this.router.navigate(["paciente-form",paciente._id])
  }

  agregarPaciente(){
    this.router.navigate(["paciente-form",0])
  }
  verControl(paciente:Paciente){
    this.router.navigate(['datosMedicosHome',paciente._id])
  }
}

