import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosMedicos } from 'src/app/models/datos-medicos';
import { DatosMedicosServiceService } from 'src/app/services/datos-medicos-service.service';
import * as ExcelJS from 'exceljs';
//import {Subject} from 'rxjs';
@Component({
  selector: 'app-datosmedicos-lis',
  templateUrl: './datosmedicos-lis.component.html',
  styleUrls: ['./datosmedicos-lis.component.css']
})
export class DatosmedicosLisComponent implements OnInit, OnDestroy{
  datosMedicos:Array<DatosMedicos>;
  datoMed!:DatosMedicos;
  fecha!:string;
  //dtOptions: DataTables.Settings = {}; 
  //dtTrigger = new Subject<any>();
  searchText = '';
  constructor(private datosMedicosService:DatosMedicosServiceService, private router:Router){
    this.datosMedicos=new Array<DatosMedicos>();
    this.fecha = String(new Date().toLocaleDateString('es-ar'));
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
  getAllData(){
    this.datosMedicosService.getDatosMedicos().subscribe(
      result=>{
        console.log(result)
        for(let i=0; i<result.length;i++){
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
      error=>{
        console.log(error)
      }
    )
  }
  modificarDatoMedico(data:DatosMedicos){
    this.router.navigate(['datosMedicos-form',data.idDatoMedico])
  }
  eliminarDatoMedico(data:DatosMedicos){
    this.datosMedicosService.deleteDatosMedicos(data.idDatoMedico).subscribe(
      result=>{
        console.log(result)
        alert('Datos Medicos eliminados correctamente')
        const index = this.datosMedicos.findIndex(t => t.idDatoMedico === data.idDatoMedico);
        if (index !== -1) {
          this.datosMedicos.splice(index, 1);
        }
      },
      error=>{
        console.log(error)
        alert('Datos medicos no pudieron ser eliminados')
      }
    )
  }
  
  excelTable(){
    const workbook = new ExcelJS.Workbook();
    const creat = workbook.creator = ('Centro de Salud');
    const worksheet = workbook.addWorksheet('Datos Paciente');
    console.log(this.datosMedicos);
    
    const dataStyle = {
      alignment: { horizontal: 'left' as 'left'},
      border: { bottom: { style: 'thin' } }
    };
  
    // Agregar encabezados de columna
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nombre Paciente', key: 'pacienteObj.nombre', width: 20 },
      { header: 'Apellido Paciente', key: 'pacienteObj.apellido', width: 20 },
      { header: 'Fecha Nacimiento', key: 'pacienteObj.fechaNac', width: 15 },
      { header: 'DNI Paciente', key: 'pacienteObj.dni', width: 15 },
      { header: 'Motivo Control', key: 'motivo', width: 20 },
      { header: 'Peso Paciente', key: 'peso', width: 10 },
      { header: 'Altura Paciente', key: 'altura', width: 10 },
      { header: 'IMC Paciente', key: 'imc', width: 10 },
      { header: 'Tensión Arterial', key: 'tension_arterial', width: 15 },
      { header: 'Diagnóstico Control', key: 'diagnostico', width: 30 },
      { header: 'Fecha de Control', key: 'fecha', width: 15 }
    ];

    for(this.datoMed of this.datosMedicos){
      worksheet.addRow({
        id: this.datoMed.idDatoMedico,
        'pacienteObj.nombre': this.datoMed.pacienteObj.nombre,
        'pacienteObj.apellido': this.datoMed.pacienteObj.apellido,
        'pacienteObj.fechaNac': this.datoMed.pacienteObj.fechaNac,
        'pacienteObj.dni': this.datoMed.pacienteObj.dni,
        motivo: this.datoMed.motivo,
        peso: this.datoMed.peso,
        altura: this.datoMed.talla,
        imc: this.datoMed.imc,
        tension_arterial: this.datoMed.tension_arterial,
        diagnostico: this.datoMed.diagnostico,
        fecha:this.datoMed.fecha
      });
      console.log(this.datoMed)
    }
    worksheet.eachRow({ includeEmpty: true }, row => {
      row.eachCell(cell => {
        cell.style = {
          alignment: { horizontal: 'left' as 'left'},
          border: { bottom: { style: 'thin' } }
        }
      });
    });
    
    worksheet.getRow(1).eachCell({ includeEmpty: true }, cell => {
      cell.style = {
        font: { bold: true },
        alignment: { horizontal: 'center' },
        border: { bottom: { style: 'thin'} },
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'D3D3D3' } }
      };
    });
    workbook.xlsx.writeBuffer().then((data:ArrayBuffer) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `informeControles_${this.fecha}.xlsx`
      a.click()
    })
  }
}
