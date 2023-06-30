import { Router } from "express";
import ProveedoresController from "../controller/ProveedoresController";

const routes = Router();

routes.get("", ProveedoresController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/getById/:id", ProveedoresController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", ProveedoresController.add);

export default routes;