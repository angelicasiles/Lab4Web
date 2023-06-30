import { Router } from "express";
import VendedoresController from "../controller/VendedoresController";

const routes = Router();

routes.get("", VendedoresController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/getById/:id", VendedoresController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", VendedoresController.add);

export default routes;