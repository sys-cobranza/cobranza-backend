import { VentaDetalleEntity } from './entities/venta-detalle';
import { VentaEntity } from './entities/venta-entity';
import { PersonaEntity } from './entities/persona-entity';
import "reflect-metadata";
import { ConnectionOptions } from "typeorm";
import { ProductoEntity } from "./entities/producto-entity";
import { UsuarioEntity } from "./entities/usuario-entity";
import * as config from "./utils/config";

export let dbOptions: ConnectionOptions = {
     type: "mysql",
     host: config.DB_HOST,
     port: Number(config.DB_PORT),
     username: config.DB_USER,
     password: config.DB_PASS,
     database: config.DB_NAME,
     entities: [
          ProductoEntity,
          UsuarioEntity,
          PersonaEntity,
          VentaEntity,
          VentaDetalleEntity
     ],
     extra: { "insecureAuth": true },
     synchronize: true,
     logging: false
}