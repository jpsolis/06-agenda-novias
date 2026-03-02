import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Pago } from './enitities/pago.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreatePagoDto } from './dto/create-pago.dto';
import { User } from 'src/auth/entities/user.entity';
import { UpdatePagoDto } from './dto/update-pago.dto';

@Injectable()
export class PagoService {

    
    private readonly logger = new Logger('PagoService');
        
    constructor(
        @InjectRepository(Pago)
        private pagoRepository : Repository<Pago>,
        private readonly dataSource : DataSource,
    ){}
    
    async create( createPagoDto: CreatePagoDto, user: User){
        try {
            const pago = this.pagoRepository.create(createPagoDto);
            await this.pagoRepository.save(pago);
        } catch (error) {
            
        }
    }
    
    findAll(): Promise<Pago[]> {
        return this.pagoRepository.find();
    }
    
    findOne(id: number): Promise<Pago | null> {
        return this.pagoRepository.findOneBy({id});
    }
    
    async update(id: number, updatePagoDto : UpdatePagoDto, user : User){
        const { ...toUpdate } = updatePagoDto;
        
            const pago = await this.pagoRepository.preload({ id, ...toUpdate });
            if( !pago ) throw new NotFoundException(`Pago con id: ${ id } no encontrado`);
        
        
            // Create query runner
            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
        
        
        
            try {
            await queryRunner.manager.save( pago );
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
        await this.pagoRepository.delete(id);
    }
    
        private handleDBExceptions(error: any){
        if(error.code === '23505')
            throw new BadRequestException(error.detail);
    
        this.logger.error(error)
        throw new InternalServerErrorException('Unexpected error, check server logs');
        }
    
        async deleteAllPagos(){
        const query = this.pagoRepository.createQueryBuilder('pago');
    
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
