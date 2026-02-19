import { IsString, MaxLength } from "class-validator";

export class CreateSalonDto {

    @IsString()
    @MaxLength(4)
    nombre: string;

    @IsString()
    @MaxLength(4)
    direccion: string;

    @IsString()
    @MaxLength(4)
    telefono: string
}