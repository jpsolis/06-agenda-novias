import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'servicios'})
export abstract class Servicios {

@PrimaryGeneratedColumn()
id: number;

@Column()
nombre: string;

@Column()
duracionMin: number;

@Column()
precioBase: number;



}