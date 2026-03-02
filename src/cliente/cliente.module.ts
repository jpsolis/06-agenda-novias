import { TypeOrmModule } from "@nestjs/typeorm";
import { ClienteController } from "./cliente.controller";
import { ClienteService } from "./cliente.service";
import { Cliente } from "./entities/cliente.entity";
import { AuthModule } from "src/auth/auth.module";
import { Module } from "@nestjs/common";

@Module({
  controllers: [ClienteController],
  providers: [ClienteService],
  imports: [
    TypeOrmModule.forFeature([Cliente]), AuthModule
  ],
  exports: [
    ClienteService
  ]
})

export class ClienteModule {}