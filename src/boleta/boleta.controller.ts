import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BoletaService } from './boleta.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { CreateBoletaDto } from './dto/create-boleta.dto';
import { User } from 'src/auth/entities/user.entity';
import { UpdateBoletaDto } from './dto/update-boleta.dto';

@Controller('boleta')
export class BoletaController {
  constructor(private readonly boletaService: BoletaService) {}

   @Post()
        @Auth(ValidRoles.admin)
        create(@Body() createBoletaDto: CreateBoletaDto,  @GetUser() user : User,) {
          return this.boletaService.create(createBoletaDto, user);
        }
      
        @Get()
        findAll() {
          return this.boletaService.findAll();
        }
      
        @Get(':id')
        findOne(@Param('id') id: string) {
          return this.boletaService.findOne(+id);
        }
      
        @Patch(':id')
        @Auth(ValidRoles.admin)
        update(
          @Param('id') id: string,
          @Body() updateBoletaDto: UpdateBoletaDto,
          @GetUser() user : User,
        ) {
          return this.boletaService.update(+id, updateBoletaDto, user);
        }
      
        @Delete(':id')
        @Auth(ValidRoles.admin)
        remove(
          @Param('id') id: string,
          @GetUser() user : User,) {
          return this.boletaService.remove(+id);
        }
}
