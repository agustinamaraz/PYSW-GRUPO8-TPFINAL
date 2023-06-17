import { Rol } from "./rol";

export class Usuario {
    _id!: string;
    username!: string;
    password!: string;
    rol!: Rol;

    Usuario(id: string = "", username: string = "", password: string = "", rol: Rol = new Rol()) {
        this._id = id;
        this.username = username;
        this.password = password;
        this.rol = rol;
    }
}