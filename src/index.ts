import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import routes from './routes';
import { User } from "./entity/User";

createConnection().then(async connection => {

   // create express app
   const app = express();
   app.use(bodyParser.urlencoded({ extended: false }));
   app.use(bodyParser.json());
   app.use('/', routes);

   app.listen(3000);
}).catch(error => console.log(error));
