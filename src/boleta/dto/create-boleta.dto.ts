import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateBoletaDto {

@IsDateString()
fecha: string;

@IsNumber()
subtotal: number;

@IsNumber()
impuesto: number;

@IsNumber()
total: number;

@IsString()
estadoPago: number;

}