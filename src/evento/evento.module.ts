import { Module } from '@nestjs/common';
import { EventoService } from './evento.service';
import { EventoController } from './evento.controller';
import { Evento } from './entity/evento-entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [EventoController],
  providers: [EventoService],
  imports: [
      TypeOrmModule.forFeature([Evento]), AuthModule
    ],
    exports: [
      EventoService
    ]
})
export class EventoModule {}
