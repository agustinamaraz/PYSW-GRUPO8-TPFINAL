import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Contacto } from 'src/app/models/contacto';
import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css']
})
export class PacienteFormComponent implements OnInit {

  paciente = new Paciente();
  accion: string="";
  contactoCel !: Contacto
  contactoGmail !: Contacto 
  id!:string
  constructor(private pacienteService: PacienteService, private activatedRoute: ActivatedRoute, 
    private router: Router,private toastr:ToastrService) {
       this.contactoCel = new Contacto()
       this.contactoGmail = new Contacto()
       this.id=""
     }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        
        if (params['id'] == 0) {
          this.accion = "new";
           
            this.contactoCel.tipo ="celular"
            this.contactoCel.descripcion = "."
            
            this.contactoGmail.tipo = "gmail"
            this.contactoGmail.descripcion = "."
        } else {
          this.accion = "update";
          this.cargarPaciente(params['id']);
          this.id=params['id']
        }
      }
    )
  }

  
  cargarPaciente(id: string) {
    this.pacienteService.getPaciente(id).subscribe(
      (result) => {
        Object.assign(this.paciente, result);
        console.log(result);
        
        this.contactoCel=result.contactos[0]
        this.contactoGmail= result.contactos[1]
        
        
      },
      error => {
        console.log(error);
      }
    )
  }

  guardarPaciente() {
    console.log(this.paciente);
    this.pacienteService.createPaciente(this.paciente).subscribe(
      result => {
        if (result.status == 1) {
          this.pacienteService.getPacientes().subscribe(
            result1=>{
              console.log(result1)
              var i = result1.length-1
                this.id = result1[i]._id
                if(this.id !=""){
                  this.pacienteService.addRecurso(this.id,this.contactoCel).subscribe(
                    result2 =>{
                      console.log(result2)
                       this.pacienteService.addRecurso(this.id,this.contactoGmail).subscribe(
                         result3=>{
                          console.log(result3)
                          this.toastr.success('Paciente agregado correctamente','Paciente Agregado')
                          this.router.navigate(["paciente"])
                         }
                       )
                    },
                    error2=>{
                      console.log(error2)
                    }
                  )
                }
            }
          )
         
        }
      },
      error => {
        this.toastr.error("Debe completar todos los campos")
      }
    ) 
   


  }


  modificarPaciente() {
    console.log("Entrando a modificar paciente")
    this.pacienteService.editPaciente(this.paciente).subscribe(
      result => {
        if (result.status == 1) {
             this.pacienteService.deleteRecurso(this.id,this.contactoGmail._id).subscribe(
              result22=>{
                             this.pacienteService.deleteRecurso(this.id,this.contactoCel._id).subscribe(
                               result44=>{
                                  this.pacienteService.addRecurso(this.id,this.contactoCel).subscribe(
               result2=>{
                this.pacienteService.addRecurso(this.id,this.contactoGmail).subscribe(
                  result3=>{
                    this.toastr.success('Paciente Modificado Correctamente', 'Paciente Modificado')
                        this.router.navigate(["paciente"])
                  }
                )
               }
             )
                               }
                             )
             
              }
             )
          
          
        }
      },
      error => {
        this.toastr.error(error.msg)
      }
    )
  }

  public cancelar() {
    this.router.navigate(["paciente"]);
  }

}
