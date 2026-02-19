import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'itemboleta'})
export class itemboleta {
    
@PrimaryGeneratedColumn()
id: string;

@Column()
cantidad: number;

@Column()
descripcion: string;

@Column()
precioUnit: number;

@Column()   
descuento: number;

}