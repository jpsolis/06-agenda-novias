import { Controller } from '@nestjs/common';
import { BoletaService } from './boleta.service';

@Controller('boleta')
export class BoletaController {
  constructor(private readonly boletaService: BoletaService) {}
}
