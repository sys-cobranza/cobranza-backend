import { VentaEntity } from "../entities/venta-entity";
import { getManager } from "typeorm";

export class VentaRepo {

    getAll() {
        return getManager().getRepository(VentaEntity)
            .createQueryBuilder("venta")
            .leftJoinAndSelect("venta.venta_detalle", "venta_detalle")
            .leftJoinAndSelect("venta_detalle.usuario_crea", "usuario_crea")
            .innerJoinAndSelect("venta.persona", "persona")
            .innerJoinAndSelect("venta.usuario_crea", "usuario")
            .select()
            .getMany();
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

    getDeuda(clientId: number) {
        return getManager().getRepository(VentaEntity)
            .createQueryBuilder("venta")
            .leftJoinAndSelect("venta.venta_detalle", "venta_detalle")
            .innerJoinAndSelect("venta.persona", "persona")
            .select("venta.id")
            .addSelect("venta.fecha")
            .addSelect("venta.cuotaDiaria")
            .addSelect("venta.montoVenta")
            .addSelect("SUM(venta_detalle.montoCobro)", "venta_MontoCobro")
            .addSelect("venta.montoVenta-COALESCE(SUM(venta_detalle.montoCobro),0)", "venta_Deuda")
            .groupBy("venta.id")
            .where("persona.id = :id", { id: clientId })
            .having("venta_Deuda > :deuda", { deuda: 0 })
            .getRawMany();
    }

    getDeudaClientes(client: String) {
        return getManager().getRepository(VentaEntity)
            .createQueryBuilder("venta")
            .limit(10)
            .leftJoinAndSelect("venta.venta_detalle", "venta_detalle")
            .innerJoinAndSelect("venta.persona", "persona")
            .select("venta.id","id")
            .addSelect("persona.id","personaId")
            .addSelect("venta.fecha","fecha")
            .addSelect("persona.nombre","nombre")
            .addSelect("persona.apellidos","apellidos")
            .addSelect("persona.numeroDocumento","numeroDocumento")
            .addSelect("SUM(venta_detalle.montoCobro)", "montoCobro")
            .addSelect("venta.montoVenta-COALESCE(SUM(venta_detalle.montoCobro),0)", "montoDeuda")
            .groupBy("venta.id")
            .where("persona.nombreCompleto like :cliente", { cliente: '%' + client + '%' })
            .having("montoDeuda > :deuda", { deuda: 0 })
            .getRawMany();
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