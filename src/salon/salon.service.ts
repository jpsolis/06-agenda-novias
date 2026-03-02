import { UpdateSalonDto } from './dto/update-salon.dto';
import { CreateSalonDto } from './dto/create-salon.dto';
import { Salon } from './entities/salon.entity';
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class SalonService {

    private readonly logger = new Logger('SalonService');

    constructor(
        @InjectRepository(Salon)
        private salonRepository : Repository<Salon>,
        private readonly dataSource : DataSource,
    ){}

    async create( createSalonDto: CreateSalonDto, user: User){
        try {
            const salon = this.salonRepository.create(createSalonDto);
            await this.salonRepository.save(salon);
        } catch (error) {
            
        }
    }

    findAll(): Promise<Salon[]> {
        return this.salonRepository.find();
    }

    findOne(id: number): Promise<Salon | null> {
        return this.salonRepository.findOneBy({id});
    }

    async update(id: number, updateSalonDto : UpdateSalonDto, user : User){
        const { ...toUpdate } = updateSalonDto;
        
            const vehiculo = await this.salonRepository.preload({ id, ...toUpdate });
            if( !vehiculo ) throw new NotFoundException(`Salón con id: ${ id } no encontrado`);
        
        
            // Create query runner
            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
        
        
        
            try {
            await queryRunner.manager.save( vehiculo );
            await queryRunner.commitTransaction();
            await queryRunner.release();
        
            return this.findOnePlain( id );
            } catch( error ){
              await queryRunner.rollbackTransaction();
              await queryRunner.release();
              this.handleDBExceptions(error);
            }
    }

    async findOnePlain( term: number ) {
    const { ...rest } = await this.findOne( term );
    return {
      ...rest,
    }
  }

   async remove(id: number): Promise<void> {
      await this.salonRepository.delete(id);
    }
  
      private handleDBExceptions(error: any){
        if(error.code === '23505')
          throw new BadRequestException(error.detail);
    
        this.logger.error(error)
        throw new InternalServerErrorException('Unexpected error, check server logs');
      }
  
      async deleteAllSalones(){
      const query = this.salonRepository.createQueryBuilder('salon');
  
      try {
        return await query
          .delete()
          .where({})
          .execute();
      } catch (error) {
        this.handleDBExceptions(error);
      }
    }
}
