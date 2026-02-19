import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'cliente'})
export class Cliente {

@PrimaryGeneratedColumn()
id: number;

@Column()
nombre: string;

@Column()
telefono: string;

@Column()
correo: string;

}