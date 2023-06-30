import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Proveedor } from "./Proveedor"
import { Detalle_Factura } from "./Detalle_Factura";
@Entity()
export class Producto {
    //PrimaryColumn es para decirle que va a ser una llave primaria
    //PrimaryGeneratedColumn es para decirle que va a ser una llave primaria y que va a ser autoicrementar 
    @PrimaryColumn({type: 'int', unique: true})
    Codigo_Productos: number;
    @Column({type: 'varchar', length: 50,nullable:true})
    descripcion: string;
    @Column({type: 'float',nullable:true})
    Precio_Producto: number;
    @Column({type: 'int',nullable:true})
    Stock_Maximo_Producto: number;
    @Column({type: 'int',nullable:true})
    Stock_Minimo_Producto: number;
    CodigoProveedor: Proveedor;
    @Column({default:true})
    Estado: boolean

    @ManyToOne(()=> Proveedor, (proveedor) =>proveedor.productos)
    @JoinColumn({name: 'Codigo_Proveedor'})
    proveedores: Proveedor;


    @OneToMany(()=> Detalle_Factura, (Detalle)=> Detalle.producto)
    Detalle: Detalle_Factura[]; 


}