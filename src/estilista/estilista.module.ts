import { Estilista } from './entities/estilista.entity';
import { EstilistaController} from './estilista.controller';
import { EstilistaService } from './estilista.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [EstilistaController],
  providers: [EstilistaService],
  imports: [
    TypeOrmModule.forFeature([Estilista]), AuthModule
  ],
  exports: [
    EstilistaService
  ]
})
export class EstilistaModule {}
