import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Turno } from 'src/app/models/turno';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css']
})
export class TurnoComponent implements OnInit {
  turnos:Array<Turno>;
  constructor(private router:Router, private turnoService:TurnoService) { 
    this.turnos = new Array<Turno>();
    this.obtenerTurnos();
  }

  ngOnInit(): void {
  }

  obtenerTurnos(){
    this.turnoService.getTurnos().subscribe(
      result=>{
        let unTicket = new Turno();
        result.forEach((element:any) => {
          Object.assign(unTicket,element);
          this.turnos.push(unTicket);
          unTicket = new Turno();
        });
      },
      error=>{
        console.log(error);
      }
    )
  }

  eliminarTurno(ticket:Turno){
    this.turnoService.deleteTurno(ticket._id).subscribe(
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

  modificarTurno(ticket:Turno){
    this.router.navigate(["turno-form",ticket._id])
  }

}
