import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PagoService } from './pago.service';
import { ValidRoles } from 'src/auth/interfaces';
import { Auth, GetUser } from 'src/auth/decorators';
import { CreatePagoDto } from './dto/create-pago.dto';
import { User } from 'src/auth/entities/user.entity';
import { UpdatePagoDto } from './dto/update-pago.dto';

@Controller('pago')
export class PagoController {
  constructor(private readonly pagoService: PagoService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createPagoDto: CreatePagoDto, @GetUser() user: User) {
    return this.pagoService.create(createPagoDto, user);
  }

  @Get()
  findAll() {
    return this.pagoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagoService.findOne(+id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(
    @Param('id') id: string,
    @Body() updateSalonDto: UpdatePagoDto,
    @GetUser() user: User,
  ) {
    return this.pagoService.update(+id, updateSalonDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.pagoService.remove(+id);
  }
}
