import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Detalle_Factura} from "../entity/Detalle_Factura";
import { Cabecera_Factura } from "../entity/Cabecera_Factura";
import { error } from "console";

class Detalle_FacturasController {

    static getAll = async (req: Request, resp: Response) => {


        try {
            const RepoGet = AppDataSource.getRepository(Cabecera_Factura);
            let mostrar;
            try {
                mostrar = await RepoGet.find({relations:{detalles:{producto:true}}})
            } catch (error) {
                return resp.status(404).json({mensaje: "No se encontro datos."})
            } 
            return resp.status(200).json(mostrar);
        } catch (error) {
            return resp.status(404).json({mensaje: "Error al cargar los datos"})
        }
        

         
    }
    static getById = async (req: Request, resp: Response) => {
        

        try {
            const RepoGet = AppDataSource.getRepository(Cabecera_Factura);
            let mostrar, Numero; 
            Numero = parseInt(req.params["id"]);
            if (!Numero) {
                return resp.status(404).json({ mensaje: 'No se indica el ID' })
            }
            
            try {
                mostrar = await RepoGet.findOneOrFail({where: { Numero },relations:{detalles:{producto:true}}})
            } catch (error) {
                return resp.status(404).json({mensaje: "No existen datos."})
            } 
            return resp.status(200).json(mostrar);
        } catch (error) {
            return resp.status(404).json({mensaje: "Huno un error al procesar los datos los datos"})
        }
        

         
    }
        
    static add = async (req: Request, resp: Response) =>{

        try {
            // Destructuring
            // De esa manera estamos sacando del body esos datos:
            const {Numero,Fecha,Ruc_Cliente,Codigo_Vendedor,Cantidad,Codigo_Productos} = req.body;
            //ValCodigo_Productoamos los datos de entrada
            if(!Numero){
                return resp.status(404).json({ mensaje: 'Debe indicar el Numero' })
            }
            if(!Ruc_Cliente){
                return resp.status(404).json({ mensaje: 'Debe indicar el Ruc_Cliente' })
            }
            if(!Fecha){
                return resp.status(404).json({ mensaje: 'Debe indicar el Ruc_Cliente' })
            }
            if(!Codigo_Vendedor){
                return resp.status(404).json({ mensaje: 'Debe indicar el Codigo Proveedor' })
            }
            if(!Cantidad){
                return resp.status(404).json({ mensaje: 'Debe indicar la cantidad' })
            }
            if(Cantidad<0){
                return resp.status(404).json({ mensaje: 'Debe indicar la Cantidad mayor que 0' })
            }
            if(!Codigo_Productos){
                return resp.status(404).json({ mensaje: 'Debe indicar el Codigo_Productos' })
            }
            
            //Hacemos la instancia del repositorio
            const CabeRepo = AppDataSource.getRepository(Cabecera_Factura);
            const DellRepo = AppDataSource.getRepository(Detalle_Factura);
            let Cabecera, Detalles;
    
            
            Cabecera = await CabeRepo.findOne({ where: { Numero }})
            Detalles = await DellRepo.findOne({ where: { Numero }})
    
            // Validamos si el producto esta en la base de datos
            
            if(Cabecera && Detalles ){
                return resp.status(404).json({ mensaje: 'La factura ya esta en la base de datos' })
            }
    
            //Creamos el nuevo producto
            let CabeceraFactura = new Cabecera_Factura();
            let DetallesFactura = new Detalle_Factura();

            
    
            CabeceraFactura.Numero = Numero;
            CabeceraFactura.cliente = Ruc_Cliente;
            CabeceraFactura.Fecha = Fecha;
            CabeceraFactura.vendedor = Codigo_Vendedor;
            DetallesFactura.Numero = Numero;
            DetallesFactura.Cantidad = Cantidad;
            DetallesFactura.Codigo_Productos = Codigo_Productos;
            //Guardamos
            await CabeRepo.save(CabeceraFactura);
            await DellRepo.save(DetallesFactura);
            return resp.status(200).json({ mensaje: 'Factura Creada' });
    
    
            } catch (error) {
    
                return resp.status(400).json({mensaje:error})
        }

    
}
    static update = async (req: Request, resp: Response) => {

        
        try {
            const { Fecha, Ruc_Cliente, Codigo_Vendedor, Cantidad, Codigo_Productos } = req.body;
            let Numero;
            //Extraemos el id, en fomrato Int
            Numero = parseInt(req.params["numero"]);
            // Hacemos la instancia del repositorio
            const CabceraRepo = AppDataSource.getRepository(Cabecera_Factura);
            const DetalleRepo = AppDataSource.getRepository(Detalle_Factura);

            // Buscamos la factura por su número
            const factura = await CabceraRepo.findOne({ where: { Numero} });

            // Validamos si la factura existe en la base de datos
            if (!factura) {
                return resp.status(404).json({ mensaje: 'La factura no existe en la base de datos' });
            }
            factura.Fecha= Fecha; 
            factura.cliente = Ruc_Cliente;
            factura.vendedor = Codigo_Vendedor;
        

            await CabceraRepo.save(factura);

            // Buscamos el detalle de la factura
            const detalle = await DetalleRepo.findOne({ where: { Numero } });

            // Validamos si el detalle existe en la base de datos
            if (!detalle) {
                return resp.status(404).json({ mensaje: 'La factura no existe en la base de datos' });
            }

            // Buscamos el detalle de la factura por su número de factura y lo actualizamos
            await DetalleRepo.createQueryBuilder()
                .update(Detalle_Factura)
                .set({ Codigo_Productos, Cantidad })
                .where("Numero = :Numero", { Numero })
                .execute();

            return resp.status(200).json({ mensaje: 'Factura actualizada correctamente' });
        } catch (error) {
            return resp.status(400).json({ mensaje: error });
        }


    }
    static delete = async (req: Request, resp: Response) => {
        let Numero;
        try {
            Numero = parseInt(req.params["numero"]);
            if (!Numero) {
                return resp.status(400).json({ mensaje: 'Debe indicar el numero' })
            }

            const CabRepo = AppDataSource.getRepository(Detalle_Factura);
      
            let Factura;
            
            try {
                Factura = await CabRepo.findOne({ where: { Numero } })
            } catch (error) {
                return resp.status(404).json({ mensaje: 'No se encuentra en la base de datos' })
            }
            try {
                await CabRepo.remove(Factura)
                return resp.status(200).json({ mensaje: 'Se elimino correctamente' })
            } catch (error) {
                return resp.status(400).json({ mensaje:error})
            }

        } catch (error) {
            return resp.status(404).json({ mensaje: 'No se pudo eliminar' })
        }




    }
}
export default Detalle_FacturasController;