import { CreateEstilistaDto } from './dto/create-estilista.dto';
import { UpdateEstilistaDto } from './dto/update-estilista.dto';
import { Estilista } from './entities/estilista.entity';
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class EstilistaService {

    private readonly logger = new Logger('EstilistaService');

    constructor(
        @InjectRepository(Estilista)
        private estilistaRepository : Repository<Estilista>,
        private readonly dataSource : DataSource,
    ){}

    async create( createEstilistaDto: CreateEstilistaDto, user: User){
        try {
            const estilista = this.estilistaRepository.create(createEstilistaDto);
            await this.estilistaRepository.save(estilista);
        } catch (error) {
            
        }
    }

    findAll(): Promise<Estilista[]> {
        return this.estilistaRepository.find();
    }

    findOne(id: number): Promise<Estilista | null> {
        return this.estilistaRepository.findOneBy({id});
    }

    async update(id: number, updateEstilistaDto : UpdateEstilistaDto, user : User){
        const { ...toUpdate } = updateEstilistaDto;
        
            const estilista = await this.estilistaRepository.preload({ id, ...toUpdate });
            if( !estilista ) throw new NotFoundException(`Estilista con id: ${ id } no encontrado`);
        
        
            // Create query runner
            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
        
        
        
            try {
            await queryRunner.manager.save( estilista );
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
      await this.estilistaRepository.delete(id);
    }
  
      private handleDBExceptions(error: any){
        if(error.code === '23505')
          throw new BadRequestException(error.detail);
    
        this.logger.error(error)
        throw new InternalServerErrorException('Unexpected error, check server logs');
      }
  
      async deleteAllEstilistas(){
      const query = this.estilistaRepository.createQueryBuilder('estilista');
  
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
