import { Router } from "express";
import ProductosController from "../controller/ProductosController";

const routes = Router();

routes.get("", ProductosController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/getById/:id", ProductosController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", ProductosController.add);

export default routes;
