import express, { Application } from "express";
import { AppDataSource } from "./data-source";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan"
import { server } from "./config/app";
import router from "./routes"


AppDataSource.initialize().then(async () => {

    const app: Application = express();
   
    app.use(express.json());
    app.use(helmet());
    app.use(cors());
    app.use("/", router)
    app.use(morgan("dev"))
    app.use(express.urlencoded({ extended: false }));
    app.listen(server.port, () => console.log("now listening on " + server.port)) 

}).catch(error => console.log(error))