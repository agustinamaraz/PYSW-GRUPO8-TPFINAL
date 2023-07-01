import { Component, OnInit } from '@angular/core';
import { DatosMedicos } from 'src/app/models/datos-medicos';
import { Paciente } from 'src/app/models/paciente';
import { DatosMedicosServiceService } from 'src/app/services/datos-medicos-service.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-datosmedicos-form',
  templateUrl: './datosmedicos-form.component.html',
  styleUrls: ['./datosmedicos-form.component.css']
})

export class DatosmedicosFormComponent implements OnInit {
  datoMedico!: DatosMedicos;
  datosMedicos!: Array<DatosMedicos>;
  pacientes!: Array<Paciente>;
  constructor(private pacienteService: PacienteService, private datosMedicosService: DatosMedicosServiceService) {
    this.datosMedicos = new Array<DatosMedicos>()
    this.pacientes = new Array<Paciente>()
    this.datoMedico = new DatosMedicos()
    this.getAllPacientes();
    //console.log(this.pacientes.length + 'longitud');
    this.datoMedico.fecha = String(new Date().toLocaleDateString('es-ar'));
    //console.log(this.datoMedico.fecha);
  }

  ngOnInit(): void {
    //console.log(this.pacientes[0].dni + ' dni pacientes constructor')
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
  addMedicalData() {
    this.datoMedico.imc = +(this.datoMedico.peso / ((this.datoMedico.talla / 100) ** 2)).toFixed(3);
    console.log(this.datoMedico.paciente)
    this.datosMedicosService.addDatosMedicos(this.datoMedico).subscribe(
      result => {
        if (result.status == 1) {
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
}