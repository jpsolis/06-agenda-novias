import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { ClienteService } from 'src/cliente/cliente.service';
import { EventoService } from 'src/evento/evento.service';
import { ItemboletaService } from 'src/itemboleta/itemboleta.service';
import { PagoService } from 'src/pago/pago.service';
import { SalonService } from 'src/salon/salon.service';
import { Repository } from 'typeorm';
import { initialData } from './data/seed-data';
import { EstilistaService } from 'src/estilista/estilista.service';

@Injectable()
export class SeedService {
    constructor(
        private readonly clienteService: ClienteService,
        private readonly estilistaService: EstilistaService,
        private readonly eventoService: EventoService,
        private readonly itemBoletaService: ItemboletaService,
        private readonly pagoService: PagoService,
        private readonly salonService: SalonService,

        @InjectRepository( User )
        private readonly userRepository: Repository<User>,


    ){}

    
  async runSeed() {
    await this.deleteTables();

    const adminUser = await this.insertUsers();
    await this.insertCliente( adminUser );
    await this.insertEstilista( adminUser );
    await this.insertEvento(adminUser);
    await this.insertItemBoleta(adminUser);
    await this.insertPago(adminUser);
    await this.insertSalon(adminUser);

    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    await this.clienteService.deleteAllClientes();
    await this.estilistaService.deleteAllEstilistas();
    await this.eventoService.deleteAllEventos();
    await this.itemBoletaService.deleteAllItems();
    await this.pagoService.deleteAllPagos();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
      .delete()
      .where({})
      .execute()

   // await this.vehiculoService.deleteAllVehiculos();

    // const queryBuilderUser = this.userRepository.createQueryBuilder();
    // await queryBuilderUser.delete().where({}).execute();

    // const queryBuilderVehiculo = this.vehiculoRepository.createQueryBuilder();
    // await queryBuilderVehiculo
    //   .delete()
    //   .where({})
    //   .execute()
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach((user) => {
      users.push(this.userRepository.create( user ));
    });

    const dbUsers = await this.userRepository.save( seedUsers );

    return dbUsers[0];
  }

  private async insertCliente( user : User ) {
    await this.clienteService.deleteAllClientes();

    const clientes = initialData.cliente;

    const insertPromises: any[] = [];

    clientes.forEach( cliente => {
      insertPromises.push( this.clienteService.create( cliente, user ) );
    });

    await Promise.all( insertPromises );

    return true;
  }


   private async insertEstilista( user : User ) {
    await this.estilistaService.deleteAllEstilistas();

    const estilistas = initialData.estilista;

    const insertPromises: any[] = [];

    estilistas.forEach( estilista => {
      insertPromises.push( this.estilistaService.create( estilista, user ) );
    });

    await Promise.all( insertPromises );

    return true;
  }

    private async insertEvento( user : User ) {
    await this.eventoService.deleteAllEventos();

    const eventos = initialData.evento;

    const insertPromises: any[] = [];

    eventos.forEach( evento => {
      insertPromises.push( this.eventoService.create( evento, user ) );
    });

    await Promise.all( insertPromises );

    return true;
  }

   private async insertItemBoleta( user : User ) {
    await this.itemBoletaService.deleteAllItems();

    const itemBoletas = initialData.itemboleta;

    const insertPromises: any[] = [];

    itemBoletas.forEach( itemBoleta => {
      insertPromises.push( this.itemBoletaService.create( itemBoleta, user ) );
    });

    await Promise.all( insertPromises );

    return true;
  }

   private async insertPago( user : User ) {
    await this.pagoService.deleteAllPagos();

    const pagos = initialData.pago;

    const insertPromises: any[] = [];

    pagos.forEach( pago => {
      insertPromises.push( this.pagoService.create( pago, user ) );
    });

    await Promise.all( insertPromises );

    return true;
  }

     private async insertSalon( user : User ) {
    await this.salonService.deleteAllSalones();

    const salones = initialData.salon;

    const insertPromises: any[] = [];

    salones.forEach( salon => {
      insertPromises.push( this.salonService.create( salon, user ) );
    });

    await Promise.all( insertPromises );

    return true;
  }

}
