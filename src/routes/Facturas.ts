import { Router } from "express";
import Detalle_FacturasController from "../controller/Detalle_FacturasController";

const routes = Router();

routes.get("", Detalle_FacturasController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/getById/:id", Detalle_FacturasController.getById);
routes.post("", Detalle_FacturasController.add);
//Para poder agregar un dato a la base de datos, desde el postman
routes.patch("/:numero", Detalle_FacturasController.update)
routes.delete("/:numero", Detalle_FacturasController.delete)



export default routes;