import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { Anuncio } from 'src/app/models/anuncio';
import { AnuncioService } from 'src/app/services/anuncio.service';

@Component({
  selector: 'app-list-anuncio-cliente',
  templateUrl: './list-anuncio-cliente.component.html',
  styleUrls: ['./list-anuncio-cliente.component.css']
})
export class ListAnuncioClienteComponent implements OnInit {
  anuncio : Anuncio
  anuncios :Array<Anuncio>
  fecha:string
  constructor(private  anuncioServcice:AnuncioService,private pd:DatePipe,private route:Router) { 
    this.anuncio=new Anuncio()
    this.anuncios= new Array<Anuncio>()
    this.fecha = ""
  }

  ngOnInit(): void {
    this.anuncioServcice.getAnuncios().subscribe(
      result=>{
        let i= result.length - 1
        this.anuncio = result[i] ;
      }
    )
    this.fecha=String(new Date().toLocaleDateString('es-ar'))
    this.fecha= this.pd.transform(this.fecha,"yyyy-dd-MM")!
    console.log(this.fecha)
    this.anuncioServcice.getFechaAnuncios(this.fecha).subscribe(
      resul=>{
        console.log(resul)
        this.anuncios=resul
        this.invertir(this.anuncios)
      },
       error=>{
          console.log(error)
       }
    )

  }
  invertir(anuncio:  Array<Anuncio>){
    let ar = new Array<Anuncio>()
    for(let i = anuncio.length - 1, j=0 ;i >=0; i--,j++ ){
      ar[j] = anuncio[i] 
    }
  this.anuncios= ar
  } 
  verAnuncion(id:string){
    this.route.navigate(['anuncio',id])
  }
}
