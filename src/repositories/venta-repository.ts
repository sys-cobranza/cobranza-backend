import { VentaEntity } from "../entities/venta-entity";
import { getManager } from "typeorm";

export class VentaRepo {

    getAll() {
        return getManager().getRepository(VentaEntity).find();
    }

    save(venta: VentaEntity) {
        return getManager().getRepository(VentaEntity).save(venta);
    }

    update(id: number, venta: VentaEntity) {
        return getManager().getRepository(VentaEntity).update(id, venta);
    }

    delete(venta: VentaEntity) {
        return getManager().getRepository(VentaEntity).remove(venta);
    }

    getOne(id: number) {
        return getManager().getRepository(VentaEntity).findOne(id);
    }

    findOne(venta: VentaEntity) {
        return getManager().getRepository(VentaEntity).findOne(venta);
    }

    findSaldo(venta: VentaEntity) {
        return getManager().getRepository(VentaEntity)
            .createQueryBuilder("venta")
            .innerJoin("venta.venta_detalle", "venta_detalle")
            .innerJoin("venta.persona", "persona")
            .select("venta.id")
            .addSelect("venta.montoVenta-SUM(venta_detalle.montoCobro)", "sum")
            .groupBy("venta.id")
            .addGroupBy("venta.montoVenta")
            .where("persona.numeroDocumento = :documento", { documento: venta.persona.numeroDocumento })
            .getOne();
    }
}