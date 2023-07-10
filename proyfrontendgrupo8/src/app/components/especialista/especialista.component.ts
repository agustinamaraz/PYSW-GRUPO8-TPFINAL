import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Especialista } from 'src/app/models/especialista';
import { EspecialistaService } from 'src/app/services/especialista.service';

@Component({
  selector: 'app-especialista',
  templateUrl: './especialista.component.html',
  styleUrls: ['./especialista.component.css']
})
export class EspecialistaComponent implements OnInit {
  especialistas: Array<Especialista>;
  especialistasDNI: Array<Especialista>;
  dni!:string;
  constructor(private especialistaService:EspecialistaService ,private router: Router, private toastr: ToastrService) {
    this.especialistas = new Array<Especialista>();
    this.especialistasDNI = new Array<Especialista>();
    this.obtenerEspecialistas();
  }

  ngOnInit(): void {
  }
  obtenerEspecialistas() {
    this.especialistaService.getEspecialistas().subscribe(
      result => {
        let e = new Especialista();
        result.forEach((element: any) => {
          Object.assign(e, element);
          this.especialistas.push(e);
          e = new Especialista();
        });
      },
      error => {
        console.log(error);
      }
    )
  }


  obtenerEspecialistaPorDNI() {
    console.log("ENTRANDO A especialista POR DNI");
    this.especialistas = new Array<Especialista>();
    this.especialistaService.getEspecialistaPorDNI(this.dni).subscribe(
      result => {
        this.especialistasDNI = result;
        let e = new Especialista();
        result.forEach((element: any) => {
          Object.assign(e, element);
          this.especialistas.push(e);
          e = new Especialista();
        });
        console.log("SALIENDO  DE   especialista POR DNI");
      },
      error => {
        alert(error+"error al bucar especailista por dni");
      }
    )
  }

  eliminarEspecialista(e: Especialista) {
    this.especialistaService.deleteEspecialista(e._id).subscribe(
      result => {
        if (result.status == 1) {
          this.toastr.warning('Especialista eliminado correctamente', 'Especialista Eliminado')
          window.location.reload();
        }
      },
      error => {
        alert(error.msg);
      }
    )
  }

  modificarEspecialista(e: Especialista) {
    this.router.navigate(["especialista-form", e._id])
  }

  agregarEspecialista() {
    this.router.navigate(["especialista-form", 0])
  }
}
