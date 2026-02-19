import { Controller } from '@nestjs/common';
import { ItemboletaService } from './itemboleta.service';

@Controller('itemboleta')
export class ItemboletaController {
  constructor(private readonly itemboletaService: ItemboletaService) {}
}
