import { Component, OnInit } from '@angular/core';

import { error } from 'console';
import { url } from 'inspector';
import { Anuncio } from 'src/app/models/anuncio';
import { Recurso } from 'src/app/models/recurso';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-form-anuncio',
  templateUrl: './form-anuncio.component.html',
  styleUrls: ['./form-anuncio.component.css']
})
export class FormAnuncioComponent implements OnInit {
   public fechamin!:Date;
   public fechaStrMin:string
   anuncio :Anuncio
   nextbutton:string
   controlador:string
   recurso!:Recurso
   tipo!:string
   id ! : string
   archivos :any[] = []
   listRecurso  : Array <Recurso>
   list !:string
   archivoElec!:string
   arch!:Blob
   fecha !:Date 
   can!:string
   constructor(private anuncioService: AnuncioService,private route :Router,private storageService: StorageService,private activatedRoute: ActivatedRoute,private pd:DatePipe,private toastr:ToastrService) { 
    this.anuncio= new Anuncio()
    this.nextbutton = "guardar"
    this.controlador = "caja1"
   // this.recurso= new Recurso();
    this.tipo=""
    this.listRecurso = new Array<Recurso>()
    this.list=""
    this.fechaStrMin=""
    
  }

  ngOnInit(): void {
   // this.fechamin = new Date (new Date().getFullYear(),new Date().getMonth()-6,new Date().getMonth());
   //this.fechaStrMin = this.pd.transform(this.fechaStrMin,"yyyy-MM-dd")!;
    this.anuncio.fechaDesde = String(new Date().toLocaleDateString('es-ar'))
     this.fechaStrMin = this.pd.transform(this.anuncio.fechaDesde,"yyyy-dd-MM")!
    this.controlador = "caja1"
   this.activatedRoute.params.subscribe(params => {
    if (params['id'] == '0') {
      this.nextbutton = "guardar"
      this.controlador = "caja1"
      this.can="yes"
    } else {
      this.nextbutton = "modificar"
       this.controlador = "caja1"
      this.obtenerAnuncio(params['id']);
      this.id=params['id']
      console.log(this.id)
      this.can="yes"
    }
  });
  }
  cancelarVolver(){
    this.route.navigate(['list-anuncio'])
  }
  verificar(){
    if(this.fechaStrMin + 1 >= this.anuncio.fechaHasta){
        alert("Tienes   que ingresar una fecha mayor a la fecha Desde")
        this.anuncio.fechaHasta=""
    }
  }
  guardar(){
   // if(this.fecha!=null){
     //this.anuncio.fechaHasta= this.formatDate(String(this.fecha))}
     if(this.validarAnuncio()){
      
       console.log(this.anuncio.fechaHasta)
      this.anuncio.estado="activo"
 
      //this.anuncio.fechaDesde = String(new Date().toLocaleDateString('es-ar'))
    this.anuncio.fechaDesde = this.pd.transform(this.anuncio.fechaDesde,"yyyy-dd-MM")!
      console.log("Guardando Anuncio...");
      this.anuncioService.addAnuncio(this.anuncio).subscribe(
        result => {
          console.log(result);
          if (result.status == 1) {
              this.controlador="caja2"
              this.can="no"
              this.anuncioService.getAnuncios().subscribe(
                result1=>{
                  console.log(result1)
                   console.log(result1.length)
                   var i = result1.length - 1
                   this.id = result1[i]._id
                  console.log(this.id)
                }
              )
          }
        },
        error => {
          console.log(error);
          alert(error.msg);
        }
      )
    }
  }
  modificarAnuncio1(){
    if(this.validarAnuncio()){
       this.anuncioService.editAnuncio(this.id,this.anuncio).subscribe(
        result => {
          console.log(result);
          if (result.status == 1) {
            this.controlador="caja2"
            this.can="no"
          }
        },
        error => {
          console.log(error);
          alert(error.msg);
        }
       )
    }
    
  }
  tipourl(){
    this.recurso= new Recurso();
    this.recurso.tipo="url"
    this.tipo="url"
    
  }
  tipoarchivo(){
     this.recurso= new Recurso();
    
    this.tipo="archivo"
   
  }
  tipooArchivo(){
    if(this.recurso.tipo == "imagen"){
        this.archivoElec = "imagen"
    }
    if(this.recurso.tipo == "video"){
      this.archivoElec = "video"
    }
    if(this.recurso.tipo == "audio"){
      this.archivoElec = "audio"
    } 
    if(this.recurso.tipo == "documento"){
      this.archivoElec = "documento"
    }
  }

////cargarRcurso 
addRecursoP(){ 
  if(this.validarRecurso()){
if(this.tipo == "url"){
     this.anuncioService.addRecurso(this.id,this.recurso ).subscribe(
   
    result => {
      console.log(result);
      if (result.status == 1) {
        this.toastr.success('Recurso agregado correctamente','Recurso Agregado')
        this.anuncioService.getAnuncioId(this.id).subscribe(

          result=>{
            console.log(result)
            this.listRecurso=result.recursos
            this.list = "activa"
          },
          error=>{
            console.log(error)
          }

        )
      }
    },
    error => {
      console.log(error);
      alert(error.msg);
    }

  )
  }
  if(this.tipo == "archivo"){
    this.subirFirebase();
    
  }
  }
  
  
}


////cargar imagen
convertirBase64($event: any){
 // let archivos = $event.target.files
  this.arch =  $event.target.files[0]
 /*let nombre = "archivo641234"
  let reader = new FileReader();
  reader.readAsDataURL(archivos[0])
  reader.onloadend =()=>{
    console.log(reader.result)
    this.archivos.push(reader.result)
    this.storageService.subirArchivo(nombre+"_"+Date.now(),reader.result).then(urlArchivo=>{
      console.log(urlArchivo)
    })
  }*/
} 
obtenerAnuncio(id : string){
  this.anuncioService.getAnuncioId(id).subscribe(
   result=>{
      console.log(result)
      this.anuncio = result
      this.listRecurso=  this.anuncio.recursos
      this.list = "activa"
      
   },
    error=>{
        console.log(error)
    } 
  )
}
subirFirebase(){
  let archivos = this.arch
  let nombre = "archivo641234"+"_" + Date.now()
  this.recurso.referencia=nombre
  let reader = new FileReader();
  reader.readAsDataURL(archivos)
  reader.onloadend =()=>{
    console.log(reader.result)
    this.archivos.push(reader.result)
    this.storageService.subirArchivo(nombre,reader.result).then(urlArchivo=>{
      console.log(urlArchivo)
      if(urlArchivo!=null){
          this.recurso.url = urlArchivo
          this.anuncioService.addRecurso(this.id ,this.recurso).subscribe(
            result => {
              console.log(result);
              if (result.status == 1) {
                this.toastr.success('Recurso agregado correctamente','Recurso Agregado')
                this.anuncioService.getAnuncioId(this.id).subscribe(
        
                  result=>{
                    console.log(result)
                    this.listRecurso=result.recursos
                    this.list = "activa"
                  },
                  error=>{
                    console.log(error)
                  }
        
                )
              }
            },
            error => {
              console.log(error);
              alert(error.msg);
            }
          )
      }
    })
  }

}
elimarArchivo(ref : string){
 //let ref ="archivo641234_function now() { [native code] }"
  this.storageService.eliminarArchivo(ref )
}

eliminarRecurso(recurso1: Recurso){
  if(recurso1.tipo != "url"){
    let ref = recurso1.referencia
    this.anuncioService.deleteRecurso(this.id,recurso1._id).subscribe(
      result => {
        console.log(result);
        if (result.status == 1) {
          this.toastr.success('Recurso eliminado correctamente','Recurso Eliminado')
          this.anuncioService.getAnuncioId(this.id).subscribe(

            result=>{
              console.log(result)
              this.listRecurso=result.recursos
              this.list = "activa"
            },
            error=>{
              console.log(error)
            }
  
          )
        }
      },
      error => {
        console.log(error);
        alert(error.msg);
      }
    )
    this.elimarArchivo(ref)
  }
  else{
    this.anuncioService.deleteRecurso(this.id,recurso1._id).subscribe(
      result => {
        console.log(result);
        if (result.status == 1) {
          this.toastr.success('Recurso eliminado correctamente','Recurso eliminado')
          this.anuncioService.getAnuncioId(this.id).subscribe(

            result=>{
              console.log(result)
              this.listRecurso=result.recursos
              this.list = "activa"
            },
            error=>{
              console.log(error)
            }
  
          )
        }
      },
      error => {
        console.log(error);
       
      }
    )
  }
}

/////boton fib  o volver

volver(){
   this.controlador="caja1"
   this.nextbutton = "modificar" 
}
finalizar(){
 this.route.navigate(['list-anuncio'])
 this.toastr.success('Accion realizada correctamente')
}



  validarAnuncio():boolean{
    if(this.anuncio.titulo == null){
       alert("Ingrese Titulo")
       return false
      }
    if(this.anuncio.descripcion == null){
      alert("Ingrse Descriopcion")
      return false
    }
    if(this.anuncio.fechaHasta == null){
      alert("Ingrese Fecha")
      return false
    }
  
    return true
  }
  validarRecurso():boolean{
    if(this.recurso.titulo== null){
      alert("Ingrese Titulo")
      return false
     }
   if(this.recurso.descripcion == null){
     alert("Ingrse Descriopcion")
     return false
   }
   if(this.recurso.tipo == null){
    alert("Elija el tipo de Archivo")
     return false
   }
   if(this.recurso.tipo != "url"){
     if(this.arch == null){
     alert("Suba un arhivo")
     return false
     }
   }
  if(this.recurso.tipo == "url"){
    if(this.recurso.url == null){
      alert("Ingrese una url")
     return false
    }
  }
   return true
  }

  formatDate(date: string): string {
    const parts = date.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
}
