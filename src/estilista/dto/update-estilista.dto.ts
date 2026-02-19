import { PartialType } from "@nestjs/mapped-types";
import { CreateEstilistaDto } from "./create-estilista.dto";

export class UpdateEstilistaDto extends PartialType( CreateEstilistaDto ) {}