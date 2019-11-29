import { VentaDetalleEntity } from "../entities/venta-detalle";
import { getManager } from "typeorm";

export class VentaDetalleRepo {

    getAll() {
        return getManager().getRepository(VentaDetalleEntity).find();
    }

    save(ventaDetalle: VentaDetalleEntity) {
        return getManager().getRepository(VentaDetalleEntity).save(ventaDetalle);
    }

    update(id: number, ventaDetalle: VentaDetalleEntity) {
        return getManager().getRepository(VentaDetalleEntity).update(id, ventaDetalle);
    }

    delete(ventaDetalle: VentaDetalleEntity) {
        return getManager().getRepository(VentaDetalleEntity).remove(ventaDetalle);
    }

    getOne(id: number) {
        return getManager().getRepository(VentaDetalleEntity).findOne(id);
    }

    findOne(ventaDetalle: VentaDetalleEntity) {
        return getManager().getRepository(VentaDetalleEntity).findOne(ventaDetalle);
    }

    findCobranzas(ventaDetalle: VentaDetalleEntity) {
        return getManager().getRepository(VentaDetalleEntity).find(ventaDetalle);
    }

}