import { IsNumber, IsString } from "class-validator";

export class CreateServicioDto {
 
@IsString() 
nombre: string;

@IsNumber()
duracion: number;

@IsNumber()
precio: number;

@IsString()
descripcion: string;

}