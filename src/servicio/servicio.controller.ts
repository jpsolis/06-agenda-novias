import { Controller } from '@nestjs/common';
import { ServicioService } from './servicio.service';

@Controller('servicio')
export class ServicioController {
  constructor(private readonly serviciosService: ServicioService) {}
}
