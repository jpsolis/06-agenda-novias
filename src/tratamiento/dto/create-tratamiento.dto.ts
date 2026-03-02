import { IsString } from "class-validator";

export class CreateTratamientoDto{

@IsString()
descripcionTratamiento: string;

@IsString()
productoUsado: string;
}