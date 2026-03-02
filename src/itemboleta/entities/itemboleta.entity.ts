import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'itemboleta'})
export class ItemBoleta {
    
@PrimaryGeneratedColumn()
id: number;

@Column()
cantidad: number;

@Column()
descripcion: string;

@Column()
precioUnit: number;

@Column()   
descuento: number;

}