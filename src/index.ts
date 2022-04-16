import * as bodyParser from "body-parser"
import * as express from "express"
import "reflect-metadata"
import { createConnection } from "typeorm"
import routes from "./routes"

createConnection()
  .then(async (connection) => {
    // create express app
    const app = express()
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use("/", routes)

    app.listen(3000)
  })
  .catch((error) => console.log(error))
