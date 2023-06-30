import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";

@Entity()
export class Proveedor{
    //PrimaryColumn es para decirle que va a ser una llave primaria
    //PrimaryGeneratedColumn es para decirle que va a ser una llave primaria y que va a ser autoicrementar 
    @PrimaryColumn({type: 'int',unique: true})
    Codigo_Proveedor:number;
    @Column({type: 'varchar', length: 50,nullable:true})
    Nombres_Proveedor:string;
    @Column({type: 'varchar', length: 50,nullable:true})
    Apellidos_Proveedor:string;
    @Column({type: 'varchar', length: 100,nullable:true})
    Direccion_Proveedor:string;
    @Column({type: 'varchar', length: 50,nullable:true})
    Provincia_Proveedor:string;
    @Column({type: 'int',nullable:true})
    Telefono_Proveedor:number;

    @OneToMany(()=> Producto, (producto)=> producto.proveedores)
    productos: Proveedor[]; 

}