import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Especialista } from 'src/app/models/especialista';
import { Paciente } from 'src/app/models/paciente';
import { Turno } from 'src/app/models/turno';
import { EspecialistaService } from 'src/app/services/especialista.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-turno-form',
  templateUrl: './turno-form.component.html',
  styleUrls: ['./turno-form.component.css']
})
export class TurnoFormComponent implements OnInit {
  turno: Turno;
  especialistas:Array<Especialista>;
  accion: string="";
  pacientes:Array<Paciente>;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private turnoService:TurnoService, private especialistaService:EspecialistaService, private pacienteService:PacienteService) {
    this.turno = new Turno();
    this.especialistas = new Array<Especialista>();
    this.pacientes = new Array<Paciente>();
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {

        this.cargarEspecialistas();
        this.cargarPacientes();

        if (params['id'] == 0) {
          this.accion = "new";
          this.turno.estado = "libre";
          this.turno.paciente = null;
        } else {
          this.accion = "update";
          this.cargarTurno(params['id']);
        }
      }
    )
  }


  cargarEspecialistas() {
    this.especialistaService.getEspecialistas().subscribe(
      result => {
        let unEspectador = new Especialista();
        result.forEach((element: any) => {
          Object.assign(unEspectador, element);
          //console.log(element);
          this.especialistas.push(unEspectador);
          unEspectador = new Especialista();
        });
      },
      error => {
        console.log(error);
      }
    )
  }

  cargarPacientes(){
    this.pacienteService.getPacientes().subscribe(
      result => {
        let unEspectador = new Paciente();
        result.forEach((element: any) => {
          Object.assign(unEspectador, element);
          //console.log(element);
          this.pacientes.push(unEspectador);
          unEspectador = new Paciente();
        });
      },
      error => {
        console.log(error);
      }
    )
  }

  cargarTurno(id: string) {
    this.turnoService.getTurno(id).subscribe(
      (result) => {
        Object.assign(this.turno, result); //en paciente va a tener null
        this.turno.especialista = this.especialistas.find((item) => (item._id == this.turno.especialista._id))!;
        this.turno.paciente = this.pacientes.find((item) => (item._id == this.turno.paciente._id))!;
        // console.log(this.ticket.espectador);
        // console.log(this.espectadores);
      },
      error => {
        console.log(error);
      }
    )
  }

  guardarTurno() {
    //console.log(this.turno);
    this.turnoService.createTurno(this.turno).subscribe(
      result => {
        if (result.status == 1) {
          alert(result.msg);
          this.router.navigate(["turno"])
        }
      },
      error => {
        alert(error.msg);
      }
    )


  }

  modificarTurno() {
    this.turnoService.editTurno(this.turno).subscribe(
      result => {
        if (result.status == 1) {
          alert(result.msg);
          this.router.navigate(["turno"])
        }
      },
      error => {
        alert(error.msg);
      }
    )
  }

  public cancelar() {
    this.router.navigate(["turno"]);
  }

}
