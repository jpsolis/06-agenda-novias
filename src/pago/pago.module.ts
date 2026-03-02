import { Module } from '@nestjs/common';
import { PagoService } from './pago.service';
import { PagoController } from './pago.controller';
import { Pago } from './enitities/pago.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PagoController],
  providers: [PagoService],
  imports: [
      TypeOrmModule.forFeature([Pago]), AuthModule
    ],
    exports: [
      PagoService
    ]
})
export class PagoModule {}
