import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import cors = require("cors")
import helmet from "helmet"
import routes from "./routes"

const port = process.env.port || 3000;

AppDataSource.initialize().then(async () => {

    // create express app
    //Instacia del servidor express
    const app = express()
    app.use(cors());
    app.use(helmet());
    app.use(express.json());

    //Rutas 
    app.use('/', routes);
    
    // start express server
    app.listen(port,()=>{console.log(`Servidor corriendo en puerto: ${port}`)});

}).catch(error => console.log(error))
