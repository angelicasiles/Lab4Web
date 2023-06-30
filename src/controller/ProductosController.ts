import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Producto } from "../entity/Producto";

class ProductosController {

    static getAll = async (req: Request, resp: Response) => {

        //Creamos el trycatch, para que el server no se caiga en posible error.
        try {
            //Creamos metodo de GetAll, Creamos instancia de AppDataSource.
            const ProductosRepo = AppDataSource.getRepository(Producto)
            //Siempre vamos a usar un await, await = espere
            //Dentro del Find, podemos crear una condicion. Por ejemplo : 
            //find({where: {estado:true}})
            const listaProductos = await ProductosRepo.find({ where: { Estado: true } });
            //Creamos validacion para ver si hay datos en la tabala
            if (listaProductos.length == 0) {
                return resp.status(404).json({ mensaje: 'No hay datos en la base de datos' });
            }
            //Siempre tiene que devolver un dato, para el cliente.
            // Y si en un caso si hubiera datos en la base de datos, 
            //devolvemos la lista de productos
            return resp.status(200).json(listaProductos);
        } catch (error) {
            //En posible error, lo que hacemos es devolver el error
            return resp.status(400).json({ mensaje: error.error });
        }

    }
    static getById = async (req: Request, resp: Response) => {
        //Ponemos ecepxiones
        try {
            //Extraemos el id, en fomrato Int
            const Codigo_Productos = parseInt(req.params["id"]);
            if (!Codigo_Productos) {
                return resp.status(404).json({ mensaje: 'No se indica el ID' })
            }
            //Hacemos la instancia del repositorio
            const ProductosRepo = AppDataSource.getRepository(Producto);
            let producto;

            // Podemos utilizar tambien el trycatch, y asi nos ahorramos el if
            try {
                //Utilizamos el findOneOrFail, para que cree una exepcion en caso de que no
                // Encuentre
                 producto = await ProductosRepo.findOneOrFail({ where: { Codigo_Productos } })
            } catch (error) {
                return resp.status(404).json({ mensaje: 'No se encontro el producto con ese ID' })
            }
            
            // const producto = await ProductosRepo.findOne({ where: { Codigo_Producto } })
            // //Validamos producto tiene algo
            // if (!producto) {
            //     return resp.status(404).json({ mensaje: 'No se encontro el producto con ese ID' })
            // }

            // //En caso de que si alla algo, lo mande
            return resp.status(200).json({ producto })
        } catch (error) {
            //En posible error, lo que hacemos es devolver el error
            return resp.status(400).json({ mensaje: error.error });
        }




    }

    static add = async (req: Request, resp: Response) => {
        //Agregamos el trycath
        try {
            // Destructuring
            // De esa manera estamos sacando del body esos datos:
            const {Codigo_Productos,descripcion,Precio_Producto,Stock_Maximo_Producto,Stock_Minimo_Producto,CodigoProveedor} = req.body;
            //ValCodigo_Productoamos los datos de entrada
            if(!Codigo_Productos){
                return resp.status(404).json({ mensaje: 'Debe indicar el ID' })
            }
            if(!descripcion){
                return resp.status(404).json({ mensaje: 'Debe indicar el nombre del producto' })
            }
            if(!Precio_Producto){
                return resp.status(404).json({ mensaje: 'Debe indicar el precio' })
            }
            if(Precio_Producto<0){
                return resp.status(404).json({ mensaje: 'Debe indicar un precio mayor que 0' })
            }
            if(!Stock_Maximo_Producto){
                return resp.status(404).json({ mensaje: 'Debe indicar el stock Maximo del producto' })
            }
            if(Stock_Maximo_Producto<0){
                return resp.status(404).json({ mensaje: 'Debe indicar el stock mayor que 0' })
            }
            if(!Stock_Minimo_Producto){
                return resp.status(404).json({ mensaje: 'Debe indicar el stock Minimo del producto' })
            }
            if(Stock_Minimo_Producto<0){
                return resp.status(404).json({ mensaje: 'Debe indicar el stock minimo  mayor que 0' })
            }
            if(!CodigoProveedor){
                return resp.status(404).json({ mensaje: 'Debe indicar el Codigo del Proveedor' })
            }
            // Validaciones de reglas de negocio
            const ProductosRepo = AppDataSource.getRepository(Producto);
            //Buscamoms el producto en la base de datos, para ver si existe
            const pro = await ProductosRepo.findOne({where:{Codigo_Productos}})

            // Validamos si el producto esta en la base de datos
            if(pro){
                return resp.status(404).json({ mensaje: 'El producto ya existe en la base de datos' })
            }

            //Creamos el nuevo producto
            let producto = new Producto();
            producto.Codigo_Productos = Codigo_Productos;
            producto.descripcion = descripcion;
            producto.Precio_Producto = Precio_Producto;
            producto.Stock_Maximo_Producto = Stock_Maximo_Producto;
            producto.Stock_Minimo_Producto = Stock_Minimo_Producto;
            producto.CodigoProveedor = CodigoProveedor;
            producto.Estado = true;

            //Guardamos
            await ProductosRepo.save(producto);
            return resp.status(200).json({ mensaje: 'Producto Creado' });

        } catch (error) {
            return resp.status(400).json({mensaje:error})
        }
        
    }

    static update = async (req: Request, resp: Response) => {

    }
    static delete = async (req: Request, resp: Response) => {

    }
}

export default ProductosController;