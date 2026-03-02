import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'estilista'})
export class Estilista {

@PrimaryGeneratedColumn()
id: number;

@Column()
nombre: string;

@Column()
especialidades: string;

}