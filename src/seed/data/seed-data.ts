import * as bcrypt from 'bcrypt';

interface SeedReparacion {
    fecha_ingreso: string,
    fecha_entrega: string,
    descripcion: string,
    costo_mano_obra: number,
    imagenes?: string[],

}

interface SeedData {
    users: SeedUser[];
    boleta: SeedBoleta[];
    cliente: SeedCliente[];
    estilista: SeedEstilista[];
    evento: SeedEvento[];
    itemboleta: SeedItemBoleta[];
    pago: SeedPago[];
    salon: SeedSalon[];
}

interface SeedUser{
    email: string;
    fullName: string,
    password: string;
    roles: string[];
}

interface SeedBoleta{
    fecha: string;
    subtotal: number;
    impuesto: number;
    total: number;
    estadoPago: string; 
  
}

interface SeedCliente{
    nombre: string;
    telefono: string;
    correo: string;
    rut: string;
    direccion: string

}

interface SeedEstilista{
    nombre: string;
    especialidades: string;
}

interface SeedEvento{
    fechaEvento: string;
    horaEvento: string;
    lugarEvento: string;
    observaciones: string;  
}

interface SeedItemBoleta{
    cantidad: number;
    descripcion: string;
    precioUnit: number;
    descuento: number;
    
}

interface SeedPago{
    metodo: string;
    monto: number;
    fechaPago: string;
}

interface SeedSalon{
    nombre: string;
    direccion: string;
    telefono: string;
}



export const initialData: SeedData  = {

     users: [
        {
            email: '123@456.com',
            fullName: 'Test Uno',
            password: bcrypt.hashSync( 'Abc123', 10),
            roles: ['admin']
        },
        {
            email: '345@678.com',
            fullName: 'Test Dos',
            password: bcrypt.hashSync( 'Abc123', 10),
            roles: ['user','super']
        },
    ],

    boleta: [
        {
            fecha: '2025-01-10T03:00:00.000Z',
            subtotal: 5500,
            impuesto: 500,
            total: 5000,
            estadoPago: 'Pagado'
        },
        {
            fecha: '2025-01-15T03:00:00.000Z',
            subtotal: 15500,
            impuesto: 1500,
            total: 13500,
            estadoPago: 'Adeudado'
        },
    ],

    cliente: [
        {
            nombre: 'Mary Rose McGill', 
            telefono: '983521133',
            correo: 'mary@gmail.com',
            rut: '6215783-k',
            direccion: 'Los Robles 45'
        },
        {
           nombre: "Raquel Argandoña", 
           telefono: "983521144",
           correo: "raquel@gmail.com",
           rut: "92315783-k",
           direccion: 'Pasaje Neptuno 3422'
        },
      
    ],

    estilista: [
        {
            nombre: 'Maly Jorquiera',
            especialidades: 'Maquillaje',
           
        },
        
    ],

    evento: [

        {
            fechaEvento: '2025-01-10T03:00:00.000Z',
            horaEvento: '15:30',
            lugarEvento: 'Casona de las delicias',
            observaciones: 'Sin observaciones'
        },
        {
            fechaEvento: '2025-01-10T03:00:00.000Z',
            horaEvento: '12:30',
            lugarEvento: 'Il Giardino',
            observaciones: 'Sin observaciones'
        },
    ],

    itemboleta: [
        {
            cantidad: 234,
            descripcion: "manzanas",
            precioUnit: 40000,
            descuento: 10,
        },
        {
            cantidad: 500,
            descripcion: "paltas",
            precioUnit: 500,
            descuento: 10,
        },
        {
            cantidad: 234,
            descripcion: "peras",
            precioUnit: 200,
            descuento: 10,
        }

    ],

    pago: [
        {
           metodo: 'débito',
           monto: 15000,
           fechaPago: '2025-01-10T03:00:00.000Z'
        }
    ],

     salon: [
        {
            nombre: 'Natalia Escobar Makeup',
            direccion: 'Peumo de los Andes 1581',
            telefono: '555-5555'
        }
    ]
    
}