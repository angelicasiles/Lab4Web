import { Router } from "express";
import Cabecera_FacturasController from "../controller/Cabera_FacturasController";

const routes = Router();

routes.get("", Cabecera_FacturasController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/getById/:id", Cabecera_FacturasController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", Cabecera_FacturasController.add);

export default routes;