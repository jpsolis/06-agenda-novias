import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'cliente'})
export class Cliente {

@PrimaryGeneratedColumn()
id: number;

@Column()
nombre: string;

@Column()
rut: string;

@Column()
telefono: string;

@Column()
direccion: string;

@Column()
correo: string;

}