import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Proveedor } from "./Proveedor";
import { Cliente } from "./Cliente";
import { Vendedor } from "./Vendedor";
import { Detalle_Factura } from "./Detalle_Factura";

@Entity()
export class Cabecera_Factura {
    save(Cabecera_Factura: typeof Cabecera_Factura) {
        throw new Error("Method not implemented.");
    }
    static findByPk(Numero: number) {
        throw new Error("Method not implemented.");
    }
    //PrimaryColumn es para decirle que va a ser una llave primaria
    //PrimaryGeneratedColumn es para decirle que va a ser una llave primaria y que va a ser autoicrementar 
    @PrimaryColumn({type: 'int', unique: true})
    Numero: number;
    @Column({type: 'date',nullable:true})
    Fecha: Date;

    @ManyToOne(() => Cliente,(cliente)=> cliente.facturaCabe)
    @JoinColumn({ name: 'Ruc_Cliente' })
    cliente: Cliente;

    
    
    @ManyToOne(() => Vendedor,(vendedor) => vendedor.Cabeceras)
    @JoinColumn({ name: 'Codigo_Vendedor' })
    vendedor: Vendedor;



    @OneToMany(()=> Detalle_Factura, (detalles)=> detalles.caberasfactura, {cascade: ['insert', 'update']})
    detalles: Detalle_Factura[]; 

}