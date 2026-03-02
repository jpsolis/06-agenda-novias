import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemBoleta } from './entities/itemboleta.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateItemBoletaDto } from './dto/create-itemboleta.dto';
import { UpdateItemBoletaDto } from './dto/update-itemboleta.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ItemboletaService {

    private readonly logger = new Logger('ItemBoletaService');
        
    constructor(
        @InjectRepository(ItemBoleta)
        private itemBoletaRepository : Repository<ItemBoleta>,
        private readonly dataSource : DataSource,
    ){}
    
    async create( createItemboletaDto: CreateItemBoletaDto, user: User){
        try {
            const itemBoleta = this.itemBoletaRepository.create(createItemboletaDto);
            await this.itemBoletaRepository.save(itemBoleta);
        } catch (error) {
            
        }
    }
    
    findAll(): Promise<ItemBoleta[]> {
        return this.itemBoletaRepository.find();
    }
    
    findOne(id: number): Promise<ItemBoleta | null> {
        return this.itemBoletaRepository.findOneBy({id});
    }
    
    async update(id: number, updateItemBoletaDto : UpdateItemBoletaDto, user : User){
        const { ...toUpdate } = updateItemBoletaDto;
        
            const evento = await this.itemBoletaRepository.preload({ id, ...toUpdate });
            if( !evento ) throw new NotFoundException(`Evento con id: ${ id } no encontrado`);
        
        
            // Create query runner
            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
        
        
        
            try {
            await queryRunner.manager.save( evento );
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
        await this.itemBoletaRepository.delete(id);
    }
    
        private handleDBExceptions(error: any){
        if(error.code === '23505')
            throw new BadRequestException(error.detail);
    
        this.logger.error(error)
        throw new InternalServerErrorException('Unexpected error, check server logs');
        }
    
        async deleteAllItems(){
        const query = this.itemBoletaRepository.createQueryBuilder('evento');
    
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
