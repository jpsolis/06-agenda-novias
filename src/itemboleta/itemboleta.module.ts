import { Module } from '@nestjs/common';
import { ItemboletaService } from './itemboleta.service';
import { ItemboletaController } from './itemboleta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemBoleta } from './entities/itemboleta.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ItemboletaController],
  providers: [ItemboletaService],
  imports: [
      TypeOrmModule.forFeature([ItemBoleta]), AuthModule
    ],
    exports: [
      ItemboletaService
    ]
})
export class ItemboletaModule {}
