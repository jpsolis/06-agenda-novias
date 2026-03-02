import { Module } from '@nestjs/common';
import { BoletaService } from './boleta.service';
import { BoletaController } from './boleta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boleta } from './entities/boleta.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [BoletaController],
  providers: [BoletaService],
  imports: [
      TypeOrmModule.forFeature([Boleta]), AuthModule
    ],
    exports: [
      BoletaService
    ]
})
export class BoletaModule {}
