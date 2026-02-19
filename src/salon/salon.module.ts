import { Salon } from './entities/salon.entity';
import { SalonController } from './salon.controller';
import { SalonService } from './salon.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SalonController],
  providers: [SalonService],
  imports: [
    TypeOrmModule.forFeature([Salon]), AuthModule
  ],
  exports: [
    SalonService
  ]
})
export class SalonModule {}
