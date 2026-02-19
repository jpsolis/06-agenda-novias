import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class CreateClienteDto {

    @IsString()
    nombre: string;

    @IsString()
    @IsPhoneNumber()
    telefono: string;

    @IsString()
    @IsEmail()
    correo: string;


}