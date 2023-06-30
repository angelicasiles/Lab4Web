import { Router } from "express";
import producto from "./productos";
import Proveedor from "./Proveedores";
import Vendedor from "./Vendedores";
import Cliente  from "./Clientes";

import Detalle_Factura  from "./Facturas";
import Detalle_FacturasController from "./Facturas";



const routes = Router();

routes.use('/Productos',producto);
routes.use('/Proveedores',Proveedor);
routes.use('/Vendedores',Vendedor);
routes.use('/Clientes',Cliente);
routes.use('/Facturas',Detalle_FacturasController);




export default routes;