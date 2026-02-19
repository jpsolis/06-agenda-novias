import { UpdateSalonDto } from './dto/update-salon.dto';
import { CreateSalonDto } from './dto/create-salon.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SalonService } from './salon.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

import { User } from 'src/auth/entities/user.entity';

@Controller('salon')
export class SalonController {
 constructor(private readonly salonService: SalonService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createSalonDto: CreateSalonDto) {
    return this.salonService.create(createSalonDto);
  }

  @Get()
  findAll() {
    return this.salonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salonService.findOne(+id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(
    @Param('id') id: string,
    @Body() updateSalonDto: UpdateSalonDto,
    @GetUser() user : User,
  ) {
    return this.salonService.update(+id, updateSalonDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(
    @Param('id') id: string,
    @GetUser() user : User,) {
    return this.salonService.remove(+id);
  }

}
