import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosMedicos } from 'src/app/models/datos-medicos';
import { Paciente } from 'src/app/models/paciente';
import { DatosMedicosServiceService } from 'src/app/services/datos-medicos-service.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-datosmedicos-form',
  templateUrl: './datosmedicos-form.component.html',
  styleUrls: ['./datosmedicos-form.component.css']
})

export class DatosmedicosFormComponent implements OnInit{
  datoMedico!:DatosMedicos;
  id!:string
  datosMedicos!: Array<DatosMedicos>;
  pacientes: Paciente[] = [];
  pacientesAux: Paciente[] = [];
  filterText: string = '';
  myDropDown!: string;
  modifica!:boolean
  filtroPacientes!:string;
  latestMedicalData!:DatosMedicos;
  asign:boolean=false;
  selectedPaciente:boolean=false;
  pacientesFiltrados: any[] = [];
  @ViewChild('selectList', { static: false }) selectList!: ElementRef;
  constructor(private pacienteService:PacienteService, private datosMedicosService: DatosMedicosServiceService, 
    private activatedRoute: ActivatedRoute, private router:Router){
  this.datosMedicos = new Array<DatosMedicos>();
  this.datoMedico = new DatosMedicos();
  this.latestMedicalData = new DatosMedicos();
  this.filtroPacientes="";
    this.getAllPacientes();
    this.datoMedico.fecha = String(new Date().toLocaleDateString('es-ar'));
    //console.log(this.datoMedico.fecha);
  }

  ngOnInit(): void {
    this.pacientesAux = this.pacientes;
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == '0') {
        this.modifica = false;
      } else {
        this.modifica = true;
        this.id = params['id'];
        this.searchData(params['id']);
        console.log(this.modifica)
      }
    });
  }
  onSubmit() {
    if (this.modifica) {
      this.modifyMedicalData();
    } else {
      this.addMedicalData();
    }
  }
  isSelected(){
    console.log(this.datoMedico.paciente)
    let cont:number=0;
    if(this.datoMedico.paciente != '' && !this.selectedPaciente && cont===0){
      console.log('AAAAAAAAAAAAAAAAAAAAAAa')
      this.selectedPaciente = true
      cont=1;
      this.searchPacienteObj();
    }
  }
  searchPacienteObj(){
    console.log(this.datoMedico.paciente)
    this.pacienteService.getPacienteById(this.datoMedico.paciente).subscribe(
      result=>{
        console.log(result)
        this.datoMedico.pacienteObj = result
        this.getLatestMedicalData();
      },
      error=>{
        console.log(error)
      }
    )
  }
  filtrarPacientes() {
    console.log("Holaaaaaaaaaaaaaaaaaaaaaaaaa  " + this.filtroPacientes)
    if (!this.filtroPacientes) {
      this.pacientes = this.pacientesAux;
    } else {
      this.pacientes = this.pacientesAux.filter((paciente: any) => {
        const nombreCompleto = paciente.nombre + ' ' + paciente.apellido;
        return nombreCompleto.toLowerCase().includes(this.filtroPacientes.toLowerCase());
      });
    }

    console.log(this.pacientes.length);
    this.selectList.nativeElement.size = this.pacientes.length + 1;
  }
  
  onChangeofOptions(newGov:any) {
    console.log(newGov);
  }
  searchData(id:string){
    this.datosMedicosService.getDatosMedicosId(id).subscribe(
      result=>{
        console.log(result);
        this.datoMedico = result;
        this.datoMedico.pacienteObj = result.paciente
        console.log(this.datoMedico.pacienteObj.dni)
      },
      error=>{
        console.log(error)
      }
    )
  }
  getAllPacientes() {
    console.log("AAAAAAAAAAAAAAAAAAAA")
    this.pacienteService.getPacientes().subscribe(
      result => {
        let unPaciente = new Paciente();
        result.forEach((element: any) => {
          Object.assign(unPaciente, element);
          console.log(unPaciente.dni + ' a ' + element.dni)
          this.pacientes.push(unPaciente);
          console.log(this.pacientes[0].dni + ' dni pacientes')
          unPaciente = new Paciente();
        });
      },
      error => {
        console.log(error);
      }
    )
  }
  async getLatestMedicalData() {
    console.log(this.datoMedico.pacienteObj.dni);
    
    if (this.datoMedico.pacienteObj.dni !== undefined) {
      setTimeout(() => {
        this.datosMedicosService.getLatest(this.datoMedico.pacienteObj.dni).subscribe(
          result => {
            console.log(result);
            console.log(this.datoMedico);
            this.latestMedicalData = result[0];
          },
          error => {
            console.log(error);
          }
        );
      }, 0);
    } else {
      console.log('NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOooo');
    }
  }
  asignLatest(){
    this.datoMedico = this.latestMedicalData
  }
  
  addMedicalData() {
    this.datoMedico.imc = +(this.datoMedico.peso / ((this.datoMedico.talla / 100) ** 2)).toFixed(3);
    console.log(this.datoMedico.paciente)
    this.datosMedicosService.addDatosMedicos(this.datoMedico.motivo, this.datoMedico.paciente,this.datoMedico.fecha,
      this.datoMedico.peso, this.datoMedico.imc, this.datoMedico.talla, this.datoMedico.tension_arterial,
      this.datoMedico.diagnostico).subscribe(
      result=>{
        if(result.status == 1){
          this.datoMedico.idDatoMedico = result._id
          alert('Guardado correctamente')
        } else {
          alert(result)
        }
      },
      error => {
        alert(error)
      }
    )
}
  modifyMedicalData(){
    this.datoMedico.imc = +(this.datoMedico.peso / ((this.datoMedico.talla / 100) ** 2)).toFixed(3);
    console.log('Entro a modificar' + this.id)
    this.datosMedicosService.editDatosMedicos(this.id,this.datoMedico.motivo, this.datoMedico.paciente,this.datoMedico.fecha,
      this.datoMedico.peso, this.datoMedico.imc, this.datoMedico.talla, this.datoMedico.tension_arterial,
      this.datoMedico.diagnostico).subscribe(
      result=>{
        if(result.status == 1){
          alert('Editado Correctamente')
        }else{
          alert(result)
        }
      },
      error=>{
        alert(error)
      }
    )
  }
}
