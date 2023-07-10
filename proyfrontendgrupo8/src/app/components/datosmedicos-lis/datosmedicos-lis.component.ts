import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosMedicos } from 'src/app/models/datos-medicos';
import { Paciente } from 'src/app/models/paciente';
import { DatosMedicosServiceService } from 'src/app/services/datos-medicos-service.service';

import * as ExcelJS from 'exceljs';

@Component({
  selector: 'app-datosmedicos-lis',
  templateUrl: './datosmedicos-lis.component.html',
  styleUrls: ['./datosmedicos-lis.component.css']
})
export class DatosmedicosLisComponent implements OnInit, OnDestroy{
  datoMed!:DatosMedicos;
  fecha!:string;
  datosMedicos: Array<DatosMedicos>;
  searchText = '';
  constructor(private datosMedicosService: DatosMedicosServiceService, private router: Router) {
    this.datosMedicos = new Array<DatosMedicos>();
  }
  ngOnInit(): void {
    this.getAllData();    
    //this.dtOptions = {
      //pagingType: 'full_numbers'
    //}
  }
  ngOnDestroy(): void {
    //this.dtTrigger.unsubscribe();
  }
  getAllData() {
    this.datosMedicosService.getDatosMedicos().subscribe(
      result => {
        console.log(result)
        for (let i = 0; i < result.length; i++) {
          var nuevo = new DatosMedicos();
            nuevo.idDatoMedico = result[i]._id;
            nuevo.motivo = result[i].motivo;
            nuevo.paciente = result[i].paciente._id;
            nuevo.fecha = result[i].fecha;
            nuevo.peso = result[i].peso;
            nuevo.imc = result[i].imc;
            nuevo.talla = result[i].talla;
            nuevo.tension_arterial = result[i].tension_arterial;
            nuevo.diagnostico = result[i].diagnostico;
            nuevo.pacienteObj = result[i].paciente;
        this.datosMedicos.push(nuevo)
        }
        //this.dtTrigger.next(this.datosMedicos);
      },
      error => {
        console.log(error)
      }
    )
  }
  modificarDatoMedico(data: DatosMedicos) {
    this.router.navigate(['datosMedicos-form', data.idDatoMedico])
  }
  eliminarDatoMedico(data: DatosMedicos) {
    this.datosMedicosService.deleteDatosMedicos(data.idDatoMedico).subscribe(
      result => {
        console.log(result)
        alert('Datos Medicos eliminados correctamente')
        const index = this.datosMedicos.findIndex(t => t.idDatoMedico === data.idDatoMedico);
        if (index !== -1) {
          this.datosMedicos.splice(index, 1);
        }
      },
      error => {
        console.log(error)
        alert('Datos medicos no pudieron ser eliminados')
      }
    )
  }
}
