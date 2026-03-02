import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Evento } from './entity/evento-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class EventoService {

private readonly logger = new Logger('EventoService');
    
constructor(
    @InjectRepository(Evento)
    private eventoRepository : Repository<Evento>,
    private readonly dataSource : DataSource,
){}

async create( createEventoDto: CreateEventoDto, user: User){
    try {
        const evento = this.eventoRepository.create(createEventoDto);
        await this.eventoRepository.save(evento);
    } catch (error) {
        
    }
}

findAll(): Promise<Evento[]> {
    return this.eventoRepository.find();
}

findOne(id: number): Promise<Evento | null> {
    return this.eventoRepository.findOneBy({id});
}

async update(id: number, updateEventoDto : UpdateEventoDto, user : User){
    const { ...toUpdate } = updateEventoDto;
    
        const evento = await this.eventoRepository.preload({ id, ...toUpdate });
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
    await this.eventoRepository.delete(id);
}

    private handleDBExceptions(error: any){
    if(error.code === '23505')
        throw new BadRequestException(error.detail);

    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');
    }

    async deleteAllEventos(){
    const query = this.eventoRepository.createQueryBuilder('evento');

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
