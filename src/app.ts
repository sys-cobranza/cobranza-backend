import * as express from 'express';
import * as bodyParser from "body-parser";
import "reflect-metadata";
import { createConnection } from "typeorm";
import * as cors from "cors";
import * as appConfig from "./app.config";

/**
 * Controllers (route handlers).
 */
import * as personaController from "./controllers/persona-controller";
import * as usuarioController from "./controllers/usuario-controller";
import * as productoController from "./controllers/producto-controller";
import * as ventaController from "./controllers/venta-controller";
import * as ventaDetalleController from "./controllers/venta-detalle-controller";

/**
 * Create Express server.
 */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
//app.use(helmet());

//require('dotenv').config()

/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 3000);

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

/**
 * Primary app routes.
 */
app.get("/api/usuario/all", usuarioController.getAll);
app.post("/api/usuario/save", usuarioController.save);
app.delete("/api/usuario/delete", usuarioController.remove);

app.get("/api/persona/all", personaController.getAll);
app.post("/api/persona/save", personaController.save);
app.delete("/api/persona/delete", personaController.remove);

app.get("/api/producto/all", productoController.getAll);
app.post("/api/producto/save", productoController.save);
app.delete("/api/producto/delete", productoController.remove);

app.get("/api/venta/all", ventaController.getAll);
app.post("/api/venta/save", ventaController.save_header);
app.post("/api/venta/save-all", ventaController.save);
app.post("/api/venta/save-cascade", ventaController.save_Cascade);
app.delete("/api/venta/delete", ventaController.remove);

app.get("/api/venta/all", ventaDetalleController.getAll);
app.post("/api/venta/save", ventaDetalleController.save);
app.delete("/api/venta/delete", ventaDetalleController.remove);

/**
 * Create connection to DB using configuration provided in 
 * appconfig file.
 */
createConnection(appConfig.dbOptions).then(async connection => {
  console.log("Connected to DB");

}).catch(error => console.log("TypeORM connection error: ", error));

module.exports = app;