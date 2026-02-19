import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'boleta'})
export class Boleta {

@PrimaryGeneratedColumn()
id: number;

@Column()
fecha: string;

@Column()
subtotal: number;

@Column()
impuesto: number;

@Column()
total: number;

@Column()
estadoPago: string;

}