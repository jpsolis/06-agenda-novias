import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Auth, GetUser } from "src/auth/decorators";
import { ValidRoles } from "src/auth/interfaces";
import { CreateClienteDto } from "./dto/create-cliente.dto";
import { UpdateClienteDto } from "./dto/update-cliente.dto";
import { User } from "src/auth/entities/user.entity";
import { ClienteService } from "./cliente.service";

@Controller('cliente')
export class ClienteController {
     constructor(private readonly clienteService: ClienteService) {}
    
      @Post()
      @Auth(ValidRoles.admin)
      create(@Body() createClienteDto: CreateClienteDto, user: User) {
        return this.clienteService.create(createClienteDto, user);
      }
    
      @Get()
      findAll() {
        return this.clienteService.findAll();
      }
    
      @Get(':id')
      findOne(@Param('id') id: string) {
        return this.clienteService.findOne(+id);
      }
    
      @Patch(':id')
      @Auth(ValidRoles.admin)
      update(
        @Param('id') id: string,
        @Body() updateClienteDto: UpdateClienteDto,
        @GetUser() user : User,
      ) {
        return this.clienteService.update(+id, updateClienteDto, user);
      }
    
      @Delete(':id')
      @Auth(ValidRoles.admin)
      remove(
        @Param('id') id: string,
        @GetUser() user : User,) {
        return this.clienteService.remove(+id);
      }
}