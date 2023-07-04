import { Rol } from "./rol";

export class Usuario {
    _id: string;
    username: string;
    password: string;
    email: string;
    rol: Rol;

    constructor(id:string="", username:string="", password:string="", email:string="" ,rol:Rol=new Rol()){
        this._id = id;
        this.username = username;
        this.password = password;
        this.email = email
        this.rol = rol;
    }
}