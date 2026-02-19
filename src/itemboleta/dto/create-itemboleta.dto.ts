import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateItemBoletaDto {

  @IsNumber()
  cantidad: number;

  @IsString()
  @MaxLength(4)
  descripcion: string;
  
  @IsNumber()
  precioUnit: number;

  @IsNumber()
  descuento: number;
}
