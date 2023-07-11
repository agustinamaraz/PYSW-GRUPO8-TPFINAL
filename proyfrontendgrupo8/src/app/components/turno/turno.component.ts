import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Turno } from 'src/app/models/turno';
import { LoginService } from 'src/app/services/login.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css']
})
export class TurnoComponent implements OnInit {
  turnos: Array<Turno>;
  misTurnos: Array<Turno>;
  pacienteService: any;

  constructor(private router: Router, private turnoService: TurnoService, private loginService: LoginService) {
    this.turnos = new Array<Turno>();
    this.misTurnos = new Array<Turno>();
    this.obtenerTurnos();
    this.obtenerMisTurnos();
  }

  ngOnInit(): void {
  }

  obtenerTurnos() {
    this.turnos = new Array<Turno>();

    this.turnoService.getTurnos().subscribe(
      result => {

        let unTurno = new Turno();

        result.forEach((element: any) => {

          if (element.paciente != null) {
            Object.assign(unTurno, element);
            this.turnos.push(unTurno);
            unTurno = new Turno();
          }

        });
      },
      error => {
        console.log(error);
      }
    )
  }

  eliminarTurno(ticket: Turno) {
    this.turnoService.deleteTurno(ticket._id).subscribe(
      result => {
        if (result.status == 1) {
          alert(result.msg);
          window.location.reload();
        }
      },
      error => {
        alert(error.msg);
      }
    )
  }

  modificarTurno(ticket: Turno) {
    this.router.navigate(["turno-form", ticket._id])
  }

  esAdministrador() {
    return this.loginService.esAdmin();
  }

  obtenerMisTurnos() {
    this.misTurnos = new Array<Turno>();

    const paciente = JSON.parse(this.loginService.getUser());

    this.turnoService.getMisTurnos(paciente.usuario.dni).subscribe(
      (result)=>{
        let unTurno = new Turno();

        result.forEach((element: any) => {

          if (element.paciente != null) {
            Object.assign(unTurno, element);
            this.misTurnos.push(unTurno);
            unTurno = new Turno();
          }

        });
      }
    )
}

}
