import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'evento'})
export class Evento{

@PrimaryGeneratedColumn()
id: number;

@Column()
fechaEvento: string;

@Column()
horaEvento: string;

@Column()
lugarEvento: string;

@Column()
observaciones: string;

}