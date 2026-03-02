import { IsNumber, IsString } from "class-validator";

export class CreateBoletaDto {

@IsString()
fecha: string;

@IsNumber()
subtotal: number;

@IsNumber()
impuesto: number;

@IsNumber()
total: number;

@IsString()
estadoPago: string;

}