import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { GooService } from 'src/app/services/goo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  calendarioGoogle: any = null;
  idCalendario: string = 'a2240f8dc916721874235dcab6ef8783ac658708a70e722f95bede9c8c979422@group.calendar.google.com';


  fromDate: string = '';
  toDate: string = '';


  // event: any = {
  //   kind: 'calendar@event',
  //   status: 'confirmed',
  //   summary: 'agusagusagus',
  //   creator: {
  //     email: 'centroSaludJujuy@gmail.com',
  //   },
  //   start: {
  //     dateTime: '2023-06-24T13:30:00-03:00',
  //     timeZone: 'America/Argentina/Jujuy',
  //   },
  //   end: {
  //     dateTime: '2023-06-24T14:30:00-03:00',
  //     timeZone: 'America/Argentina/Jujuy',
  //   },
  // };

  event!: Evento;






  constructor(private gooService: GooService, private toastr: ToastrService) {
    this.event = new Evento();
    this.event.kind = 'calendar@event';
    this.event.status = 'confirmed';
    const creador = { email: 'centroSaludJujuy@gmail.com' }
    this.event.creator = creador;
  }
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
    //idCalendario: String;
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
  crearEvento() {
    let fechafrom: Date = new Date(this.fromDate);
    let fechato: Date = new Date(this.toDate);

    const comienzo = { dateTime: this.toIsoString(fechafrom), timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone };
    const final = { dateTime: this.toIsoString(fechato), timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }; 4

    //this.event.start.dateTime = this.toIsoString(fechafrom);
    //this.event.end.dateTime = this.toIsoString(fechato);
    //pasamos por ahora el JSON event en forma estática this.event

    this.event.start = comienzo;
    this.event.end = final;

    this.gooService.createEvent(this.idCalendario, this.event).subscribe(
      (result) => {
        //console.log(result);

        this.toastr.success('Evento creado correctamente', 'Evento Agregado');

        setTimeout(function () {
          window.location.reload();
        }, 2000); // 3000 representa el tiempo en milisegundos (3 segundos)
      },
      (error) => {
        console.log(error);
        if (error.status == '401') {
          alert("debe loguearse para crear un evento en el calendario")
        }
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

}
