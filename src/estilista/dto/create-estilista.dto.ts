import { IsString, MinLength } from "class-validator";

export class CreateEstilistaDto {

    @IsString()
    @MinLength(4)
    nombre: string;

    @IsString()
    especialidades: string;



}