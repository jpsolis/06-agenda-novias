import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalonModule } from './salon/salon.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Salon } from './salon/entities/salon.entity';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import { User } from './auth/entities/user.entity';
import { SeedModule } from './seed/seed.module';
import { ServicioModule } from './servicio/servicio.module';
import { BoletaModule } from './boleta/boleta.module';
import { ItemboletaModule } from './itemboleta/itemboleta.module';
import { PagoModule } from './pago/pago.module';
import { TratamientoModule } from './tratamiento/tratamiento.module';
import { Cliente } from './cliente/entities/cliente.entity';
import { EventoModule } from './evento/evento.module';
import { Evento } from './evento/entity/evento-entity';
import { ItemBoleta } from './itemboleta/entities/itemboleta.entity';
import { Pago } from './pago/enitities/pago.entity';
import { Estilista } from './estilista/entities/estilista.entity';
import { DataSource } from 'typeorm';
import { Boleta } from './boleta/entities/boleta.entity';

@Module({
  imports: [SalonModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Mon.chi2020.2025',
      database: 'db_agenda_novias',
      entities: [Salon, Estilista, User, Cliente, Evento, ItemBoleta, Pago, Boleta],
      autoLoadEntities: true,
    
      /* Warning Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.*/
      synchronize: true, 
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','public'),
    }),

    SeedModule,

    ServicioModule,

    BoletaModule,

    ItemboletaModule,

    PagoModule,

    TratamientoModule,

    EventoModule,




  

  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {
  constructor(private dataSource: DataSource){}
}
