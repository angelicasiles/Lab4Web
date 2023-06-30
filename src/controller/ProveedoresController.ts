import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Proveedor} from "../entity/Proveedor";

class ProveedoresController {

    static getAll = async (req: Request, resp: Response) => {

         //Creamos el trycatch, para que el server no se caiga en posible error.
         try {
            //Creamos metodo de GetAll, Creamos instancia de AppDataSource.
            const ProveedoresRepo = AppDataSource.getRepository(Proveedor);
            //Siempre vamos a usar un await, await = espere
            //Dentro del Find, podemos crear una condicion. Por ejemplo : 
            //find({where: {estado:true}})
            const listaProveedores = await ProveedoresRepo.find();
            //Creamos validacion para ver si hay datos en la tabala
            if (listaProveedores.length == 0) {
                return resp.status(404).json({ mensaje: 'No hay datos en la base de datos' });
            }
            //Siempre tiene que devolver un dato, para el cliente.
            // Y si en un caso si hubiera datos en la base de datos, 
            //devolvemos la lista de Proveedores
            return resp.status(200).json(listaProveedores);
        } catch (error) {
            //En posible error, lo que hacemos es devolver el error
            return resp.status(400).json({ mensaje: error.error });
        }

    }
    static getById = async (req: Request, resp: Response) => {
    
         //Ponemos ecepxiones
         try {
            const Codigo_Proveedor = parseInt(req.params["id"]);
            //Hacemos la instancia del repositorio
            const ProveedoresRepo = AppDataSource.getRepository(Proveedor);
            let proveedor;

            // Podemos utilizar tambien el trycatch, y asi nos ahorramos el if
            try {
                //Utilizamos el findOneOrFail, para que cree una exepcion en caso de que no
                // Encuentre
                proveedor = await ProveedoresRepo.findOneOrFail({ where: { Codigo_Proveedor } })
            } catch (error) {
                return resp.status(404).json({ mensaje: 'No se encontro el producto con ese ID' })
            }
            
            // const producto = await ProductosRepo.findOne({ where: { Codigo_Producto } })
            // //Validamos producto tiene algo
            // if (!producto) {
            //     return resp.status(404).json({ mensaje: 'No se encontro el producto con ese ID' })
            // }

            // //En caso de que si alla algo, lo mande
            return resp.status(200).json({ proveedor })
        } catch (error) {
            //En posible error, lo que hacemos es devolver el error
            return resp.status(400).json({ mensaje: error.error });
        }
    }

    static add = async (req: Request, resp: Response) => {

        
    }

    static update = async (req: Request, resp: Response) => {

    }
    static delete = async (req: Request, resp: Response) => {

    }
}

export default ProveedoresController;