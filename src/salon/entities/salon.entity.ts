import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'salon'})
export class Salon {

@PrimaryGeneratedColumn()
id: number;

@Column()
nombre: string;

@Column()
direccion: string;

@Column()
telefono: string;

}