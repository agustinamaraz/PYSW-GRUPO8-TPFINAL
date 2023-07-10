import { Especialista } from "./especialista";
import { Paciente } from "./paciente";

export class Turno {
    _id: string;
    fecha:string;
    hora:string;
    paciente: Paciente;
    especialista: Especialista;
}
