import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ItemboletaService } from './itemboleta.service';
import { CreateItemBoletaDto } from './dto/create-itemboleta.dto';
import { ValidRoles } from 'src/auth/interfaces';
import { Auth, GetUser } from 'src/auth/decorators';
import { UpdateItemBoletaDto } from './dto/update-itemboleta.dto';
import { User } from 'src/auth/entities/user.entity';

@Controller('itemboleta')
export class ItemboletaController {
  constructor(private readonly itemboletaService: ItemboletaService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createItemBoletaDto: CreateItemBoletaDto, @GetUser() user: User) {
    return this.itemboletaService.create(createItemBoletaDto, user);
  }

  @Get()
  findAll() {
    return this.itemboletaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemboletaService.findOne(+id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(
    @Param('id') id: string,
    @Body() updateSalonDto: UpdateItemBoletaDto,
    @GetUser() user: User,
  ) {
    return this.itemboletaService.update(+id, updateSalonDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.itemboletaService.remove(+id);
  }
}
