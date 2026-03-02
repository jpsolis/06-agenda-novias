import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { Cliente } from "./entities/cliente.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { CreateClienteDto } from "./dto/create-cliente.dto";
import { UpdateClienteDto } from "./dto/update-cliente.dto";
import { User } from "src/auth/entities/user.entity";

@Injectable()
export class ClienteService{

    private readonly logger = new Logger('ClienteService');
    
        constructor(
            @InjectRepository(Cliente)
            private clienteRepository : Repository<Cliente>,
            private readonly dataSource : DataSource,
        ){}
    
        async create( createClienteDto: CreateClienteDto, user: User){
            try {
                const cliente = this.clienteRepository.create(createClienteDto);
                await this.clienteRepository.save(cliente);
            } catch (error) {
                
            }
        }
    
        findAll(): Promise<Cliente[]> {
            return this.clienteRepository.find();
        }
    
        findOne(id: number): Promise<Cliente | null> {
            return this.clienteRepository.findOneBy({id});
        }
    
        async update(id: number, updateClienteDto : UpdateClienteDto, user : User){
            const { ...toUpdate } = updateClienteDto;
            
                const cliente = await this.clienteRepository.preload({ id, ...toUpdate });
                if( !cliente ) throw new NotFoundException(`Cliente con id: ${ id } no encontrado`);
            
            
                // Create query runner
                const queryRunner = this.dataSource.createQueryRunner();
                await queryRunner.connect();
                await queryRunner.startTransaction();
            
            
            
                try {
                await queryRunner.manager.save( cliente );
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
          await this.clienteRepository.delete(id);
        }
      
          private handleDBExceptions(error: any){
            if(error.code === '23505')
              throw new BadRequestException(error.detail);
        
            this.logger.error(error)
            throw new InternalServerErrorException('Unexpected error, check server logs');
          }
      
          async deleteAllClientes(){
          const query = this.clienteRepository.createQueryBuilder('cliente');
      
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