import { Router } from "express";
import ClientesController from "../controller/ClientesController";

const routes = Router();

routes.get("", ClientesController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/getById/:id", ClientesController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", ClientesController.add);

export default routes;