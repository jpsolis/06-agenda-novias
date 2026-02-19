import { PartialType } from "@nestjs/mapped-types";
import { CreateItemBoletaDto } from "./create-itemboleta.dto";

export class UpdateBoletaDto extends PartialType( CreateItemBoletaDto ){}