import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  pacientes:Array<Paciente>;
  constructor(private pacienteService: PacienteService, private activatedRoute: ActivatedRoute, 
    private router: Router) { 
      this.pacientes = new Array<Paciente>();
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


  eliminarPaciente(paciente:Paciente){
    this.pacienteService.deletePaciente(paciente._id).subscribe(
      result=>{
        if(result.status == 1){
          alert(result.msg);
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
}

