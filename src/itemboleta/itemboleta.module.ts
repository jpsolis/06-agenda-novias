import { Module } from '@nestjs/common';
import { ItemboletaService } from './itemboleta.service';
import { ItemboletaController } from './itemboleta.controller';

@Module({
  controllers: [ItemboletaController],
  providers: [ItemboletaService],
})
export class ItemboletaModule {}
