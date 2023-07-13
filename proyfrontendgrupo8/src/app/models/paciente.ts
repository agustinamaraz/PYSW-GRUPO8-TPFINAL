import { Contacto } from "./contacto";

export class Paciente {
    toLowerCase() {
      throw new Error('Method not implemented.');
    }
    _id!:string;
    nombre!: string;
    apellido!: string;
    fechaNac!: string;
    dni!: string;
    contactos!:Array<Contacto>
    constructor(){
      this.contactos= new Array<Contacto>()
    }
}
