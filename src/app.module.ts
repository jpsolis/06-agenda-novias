import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalonModule } from './salon/salon.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Salon } from './salon/entities/salon.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { Estilista } from './estilista/entities/estilista.entity';
import { User } from './auth/entities/user.entity';
import { EstilistaModule } from './estilista/estilista.module';
import { SeedModule } from './seed/seed.module';
import { ServicioModule } from './servicio/servicio.module';
import { BoletaModule } from './boleta/boleta.module';
import { ItemboletaModule } from './itemboleta/itemboleta.module';
import { PagoModule } from './pago/pago.module';

@Module({
  imports: [SalonModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Mon.chi2020.2025',
      database: 'db_agenda_novias',
      entities: [Salon, Estilista, User],
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



  

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
