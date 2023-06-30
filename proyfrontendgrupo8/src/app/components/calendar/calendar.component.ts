import { Component, OnInit } from '@angular/core';
import { GooService } from 'src/app/services/goo.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  calendarioGoogle: any = null;
  idCalendario: string =
    'c_q26mptnlohvd84qnt9q6u9cs0o@group.calendar.google.com';
  fromDate: string = '';
  toDate: string = '';
  event: any = {
    kind: 'calendar#event',
    status: 'confirmed',
    summary: 'Reunion de prueba desde angular',
    creator: {
      email: 'alfredo.espi@gmail.com',
    },
    start: {
      dateTime: '2023-06-24T13:30:00-03:00',
      timeZone: 'America/Argentina/Jujuy',
    },
    end: {
      dateTime: '2023-06-24T14:30:00-03:00',
      timeZone: 'America/Argentina/Jujuy',
    },
  };
  constructor(private gooService: GooService) {}
  ngOnInit(): void {
    this.gooService.configureSingleSignOne();
  }
  login() {
    this.gooService.login();
  }
  logout() {
    this.gooService.logout();
  }
  verEventos() {
    idCalendario: String;
    this.gooService.getEvents(this.idCalendario).subscribe(
      (result) => {
        this.calendarioGoogle = result;
        alert(JSON.stringify(this.calendarioGoogle));
      },
      (error) => {
        console.log(error);
      }
    );
  }
  postEvent() {
    //let fechafrom:Date = new Date(this.fromDate);
    //let fechato:Date = new Date(this.toDate);
    //this.event.start.dateTime = this.toIsoString(fechafrom);
    //this.event.end.dateTime = this.toIsoString(fechato);
    //pasamos por ahora el JSON event en forma estática this.event
    this.gooService.createEvent(this.event, this.idCalendario).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //METODO interno que se utiliza para obtener el formato
  //que se requiere en la API de google Calendar. Ej. 2022-06-20T17:04:00-03:00
  toIsoString(date: Date) {
    var tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function (num: any) {
        return (num < 10 ? '0' : '') + num;
      };
    return (
      date.getFullYear() +
      '-' +
      pad(date.getMonth() + 1) +
      '-' +
      pad(date.getDate()) +
      'T' +
      pad(date.getHours()) +
      ':' +
      pad(date.getMinutes()) +
      ':' +
      pad(date.getSeconds()) +
      dif +
      pad(Math.floor(Math.abs(tzo) / 60)) +
      ':' +
      pad(Math.abs(tzo) % 60)
    );
  }
  token() {
    alert(this.gooService.getToken());
  }
  crearEvento(){
    
  }
}
