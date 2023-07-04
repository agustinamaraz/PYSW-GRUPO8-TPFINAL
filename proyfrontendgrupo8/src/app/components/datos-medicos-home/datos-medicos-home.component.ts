import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosMedicos } from 'src/app/models/datos-medicos';
import { Paciente } from 'src/app/models/paciente';
import { DatosMedicosServiceService } from 'src/app/services/datos-medicos-service.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-datos-medicos-home',
  templateUrl: './datos-medicos-home.component.html',
  styleUrls: ['./datos-medicos-home.component.css']
})
export class DatosMedicosHomeComponent implements OnInit {
  datosMedicos!:Array<DatosMedicos>;
  datosMedicosAux!:Array<DatosMedicos>;
  datoMedicoReciente!:DatosMedicos;
  datoMedicoVer!:DatosMedicos
  pacienteBuscado!:Paciente;
  id!:string;
  searchText = '';
  isInitialized: boolean = false;
  constructor(private datosMedicosService:DatosMedicosServiceService, private activatedRoute:ActivatedRoute,
    private pacienteService:PacienteService,
    private route:Router) {
      this.pacienteBuscado = new Paciente();
      this.datosMedicos=new Array<DatosMedicos>();
      this.datosMedicosAux=new Array<DatosMedicos>();
      this.datoMedicoReciente = new DatosMedicos();
      this.datoMedicoVer = new DatosMedicos();
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
        this.id = params['id'];
        this.searchData(this.id)
    });
    //this.getDatoMedicoReciente()
  }
  searchData(id:string){
    console.log(this.id + ' En search datas')
    this.pacienteService.getPacienteById(id).subscribe(
      result=>{
        console.log(result);
        this.pacienteBuscado = result;
        this.getDatosMedicosDni()
      },
      error=>{
        console.log(error)
      }
    )
  }
  getDatosMedicosDni(){
    console.log(this.pacienteBuscado.dni)
    this.datosMedicosService.getDatosMedicosDNI(this.pacienteBuscado.dni).subscribe(
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
        console.log(nuevo.pacienteObj.nombre + ' NOmbre '+ result[i].paciente.nombre)
        }
        console.log(this.datosMedicos[0].pacienteObj.nombre)
        if (!this.isInitialized) {
          this.getDatoMedicoReciente();
          this.isInitialized = true; // Marcar como inicializado para que no se vuelva a ejecutar
        }
      },
      error=>{
        console.log(error)
      }
    )
  }
  getDatoMedicoReciente(){
    this.datoMedicoReciente = this.datosMedicos.reduce((datoMedicoActual, datoMedico) => {
      const fechaActual = new Date(datoMedicoActual.fecha);
      const fechaDatoMedico = new Date(datoMedico.fecha);
    
      if (fechaDatoMedico > fechaActual) {
        return datoMedico;
      } else {
        return datoMedicoActual;
      }
    });
    this.datosMedicosAux = this.datosMedicos.filter((datoMedico) => {
      return datoMedico !== this.datoMedicoReciente;
    });
    this.datoMedicoVer = this.datoMedicoReciente;
  }
  seeData(data:DatosMedicos){
    this.datoMedicoVer = data
  }
  // searchPacienteObj(){
  //   this.datosMedicosService.getDatosMedicosId(this.datoMedicoReciente.paciente).subscribe(
  //     result=>{
  //       console.log(result)
  //       this.datoMedicoReciente.pacienteObj = result
  //     },
  //     error=>{
  //       console.log(error)
  //     }
  //   )
  // }

}
