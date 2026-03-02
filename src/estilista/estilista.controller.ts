import { CreateEstilistaDto } from './dto/create-estilista.dto';
import { UpdateEstilistaDto } from './dto/update-estilista.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EstilistaService } from './estilista.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

import { User } from 'src/auth/entities/user.entity';

@Controller('estilista')
export class EstilistaController {
 constructor(private readonly estilistaService: EstilistaService) {}

  @Post()
  @Auth(ValidRoles.admin )
  create(@Body() createEstilistaDto: CreateEstilistaDto, @GetUser() user : User ) {
    return this.estilistaService.create(createEstilistaDto, user );
  }

  @Get()
  findAll() {
    return this.estilistaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estilistaService.findOne(+id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(
    @Param('id') id: string,
    @Body() updateEstilistaDto: UpdateEstilistaDto,
    @GetUser() user : User,
  ) {
    return this.estilistaService.update(+id, updateEstilistaDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(
    @Param('id') id: string,
    @GetUser() user : User,) {
    return this.estilistaService.remove(+id);
  }

}
