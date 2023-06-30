import "reflect-metadata"
import { DataSource } from "typeorm"
import { Producto } from "./entity/Producto"
import { Proveedor } from "./entity/Proveedor"
import { Vendedor } from "./entity/Vendedor"
import { Cliente } from "./entity/Cliente"
import { Cabecera_Factura } from "./entity/Cabecera_Factura"
import { Detalle_Factura } from "./entity/Detalle_Factura"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "AngelicaS2004",
    database: "pruebaUtn",
    synchronize: false,
    logging: false,
    entities: [Producto,Proveedor,Vendedor,Cliente,Cabecera_Factura,Detalle_Factura],
    migrations: [],
    subscribers: [],
})
