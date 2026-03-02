import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EventoService } from './evento.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { User } from 'src/auth/entities/user.entity';

@Controller('evento')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createEventoDto: CreateEventoDto,  @GetUser() user : User) {
    return this.eventoService.create(createEventoDto, user);
  }

  @Get()
  findAll() {
    return this.eventoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventoService.findOne(+id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(
    @Param('id') id: string,
    @Body() updateEventoDto: UpdateEventoDto,
    @GetUser() user : User,
  ) {
    return this.eventoService.update(+id, updateEventoDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(
    @Param('id') id: string,
    @GetUser() user : User,) {
    return this.eventoService.remove(+id);
  }
}
