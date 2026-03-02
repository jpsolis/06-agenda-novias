import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'pago'})
export class Pago {

@PrimaryGeneratedColumn()
id: number;

@Column()
metodo: string;

@Column()
monto: number;

@Column()
fechaPago: string;

}