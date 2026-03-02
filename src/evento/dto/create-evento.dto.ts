import { IsDate, IsString } from "class-validator";

export class CreateEventoDto {
    
@IsDate()
fechaEvento: string;


horaEvento: string;

@IsString()
lugarEvento: string;

@IsString()
observaciones: string;

}