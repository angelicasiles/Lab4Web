import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";
import { Cabecera_Factura } from "./Cabecera_Factura";

@Entity()
export class Detalle_Factura{
    //PrimaryColumn es para decirle que va a ser una llave primaria
    //PrimaryGeneratedColumn es para decirle que va a ser una llave primaria y que va a ser autoicrementar 
    @PrimaryGeneratedColumn()
    Numero: number; 

    @PrimaryColumn()
    Codigo_Productos: number;


    @Column({type: 'int',nullable:true})
    Cantidad:number;


    @ManyToOne(()=> Producto, (producto)=>producto.Detalle)
    @JoinColumn({name:'Codigo_Productos'})
    producto: Producto; 

    @ManyToOne(()=> Cabecera_Factura, (caberasfactura)=>caberasfactura.detalles)
    @JoinColumn({name:'Numero'})
    caberasfactura: Cabecera_Factura; 
}