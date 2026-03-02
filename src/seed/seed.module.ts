import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ServicioModule } from 'src/servicio/servicio.module';
import { BoletaModule } from 'src/boleta/boleta.module';
import { ItemboletaModule } from 'src/itemboleta/itemboleta.module';
import { PagoModule } from 'src/pago/pago.module';
import { SalonModule } from 'src/salon/salon.module';
import { EventoModule } from 'src/evento/evento.module';
import { ClienteModule } from 'src/cliente/cliente.module';
import { EstilistaModule } from 'src/estilista/estilista.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    SeedModule,
    ServicioModule,
    BoletaModule,
    ItemboletaModule,
    PagoModule,
    SalonModule,
    EventoModule,
    ClienteModule,
    EstilistaModule,
    AuthModule
    
  ]
})
export class SeedModule {

}
