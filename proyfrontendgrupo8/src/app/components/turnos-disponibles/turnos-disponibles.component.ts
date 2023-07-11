import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/models/paciente';
import { Turno } from 'src/app/models/turno';
import { LoginService } from 'src/app/services/login.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-turnos-disponibles',
  templateUrl: './turnos-disponibles.component.html',
  styleUrls: ['./turnos-disponibles.component.css']
})
export class TurnosDisponiblesComponent implements OnInit {
  turnos: Array<Turno>;
  turno: Turno = new Turno();

  constructor(private router: Router, private turnoService: TurnoService, private loginService: LoginService, private pacienteService: PacienteService) {
    this.turnos = new Array<Turno>();
    this.obtenerTurnos();
  }

  ngOnInit(): void {
  }

  obtenerTurnos() {
    this.turnoService.getTurnosDisponibles().subscribe(
      result => {
        let unTicket = new Turno();
        result.forEach((element: any) => {
          Object.assign(unTicket, element);
          this.turnos.push(unTicket);
          unTicket = new Turno();
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

  async reservarTurno(turno: Turno) {
    this.turno = turno;

    //console.log("TURNO INICIAL:",this.turno)

    const paciente = JSON.parse(this.loginService.getUser());

    //console.log("PACIENTE en sesion:",paciente)

    try {
      const result: any = await this.pacienteService.getPacienteDni(paciente.usuario.dni).toPromise();

      const pacienteAgregar = result["0"];

      //console.log("TURNO FINAL:", pacienteAgregar);

      if (pacienteAgregar != null) {
        this.turno.estado = "reservado";
        this.turno.paciente = pacienteAgregar;

        //console.log("TURNO FINAL:", this.turno);

        this.turnoService.editTurno(this.turno).subscribe(
          result => {
            if (result.status == 1) {
              alert(result.msg);

              // if(paciente.rol.descripcion == "paciente"){
              //   this.router.navigate(["/home"])
              // }else{
                this.router.navigate(["/turno"])
              //}
  
            }
          },
          error => {
            alert(error.msg);
          }
        )
      }

    } catch (error) {
      console.error("Error al obtener los datos del paciente:", error);
      throw error;
    }

  }

}
