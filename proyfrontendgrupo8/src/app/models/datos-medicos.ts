import { Paciente } from "./paciente";

export class DatosMedicos {
    idDatoMedico: string = '';
    motivo: string = '';
    paciente: string = '';
    fecha: string = '';
    peso: number = 0;
    imc: number = 0;
    talla: number = 0;
    tension_arterial: number = 0;
    diagnostico: string = '';
    pacienteObj: Paciente = new Paciente();
}
