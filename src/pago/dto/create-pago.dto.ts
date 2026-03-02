import { IsDate, IsNumber, IsString, MaxLength } from "class-validator";

export class CreatePagoDto {

@IsString()
@MaxLength(4)
metodo: string;

@IsNumber()
monto: number;

@IsDate()
fechaPago: string;


}