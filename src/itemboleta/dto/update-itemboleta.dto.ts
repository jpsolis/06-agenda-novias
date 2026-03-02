import { PartialType } from "@nestjs/mapped-types";
import { CreateItemBoletaDto } from "./create-itemboleta.dto";

export class UpdateItemBoletaDto extends PartialType( CreateItemBoletaDto ){}