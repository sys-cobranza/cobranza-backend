import { VentaDetalleEntity } from "../entities/venta-detalle";
import { getManager } from "typeorm";

export class VentaDetalleRepo {

    getAll() {
        return getManager().getRepository(VentaDetalleEntity).find();
    }

    getCobroNow(userId: number) {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setDate(start.getDate() + 1);
        
        return getManager().getRepository(VentaDetalleEntity)
            .createQueryBuilder("venta_detalle")
            .innerJoinAndSelect("venta_detalle.persona", "persona")
            .innerJoin("venta_detalle.usuario_crea", "usuario_crea")
            .select("venta_detalle.id","id")
            .addSelect("persona.id","personaId")
            .addSelect("persona.numeroDocumento","numeroDocumento")
            .addSelect("persona.nombre","nombre")
            .addSelect("persona.apellidos","apellidos")
            .addSelect("venta_detalle.descripcion","descripcion")
            .addSelect("venta_detalle.fecha","fecha")
            .addSelect("venta_detalle.montoCobro","montoCobro")
            .where("venta_detalle.fecha >= :fecha_desde", { fecha_desde: start })
            .andWhere("venta_detalle.fecha < :fecha_hasta", { fecha_hasta: end })
            .andWhere("usuario_crea.id = :id_user", { id_user: userId })
            .getRawMany();
    }

    getCobroNotNow(userId: number) {
        const end = new Date();
        end.setHours(0, 0, 0, 0);
        const start = new Date(end);
        start.setDate(end.getDate() - 1);
        return getManager().getRepository(VentaDetalleEntity)
            .createQueryBuilder("venta_detalle")
            .innerJoinAndSelect("venta_detalle.persona", "persona")
            .innerJoin("venta_detalle.usuario_crea", "usuario_crea")
            .select("venta_detalle.id","id")
            .addSelect("persona.id","personaId")
            .addSelect("persona.numeroDocumento","numeroDocumento")
            .addSelect("persona.nombre","nombre")
            .addSelect("persona.apellidos","apellidos")
            .addSelect("venta_detalle.descripcion","descripcion")
            .addSelect("venta_detalle.fecha","fecha")
            .addSelect("venta_detalle.montoCobro","montoCobro")
            .where("venta_detalle.fecha >= :fecha_desde", { fecha_desde: start })
            .andWhere("venta_detalle.fecha < :fecha_hasta", { fecha_hasta: end })
            .andWhere("usuario_crea.id = :id_user", { id_user: userId })
            .getRawMany();
    }

    public async getCobroTotalNow(userId: number) {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setDate(start.getDate() + 1);
        return getManager().getRepository(VentaDetalleEntity)
            .createQueryBuilder("venta_detalle")
            .innerJoinAndSelect("venta_detalle.usuario_crea", "usuario_crea")
            .select("SUM(venta_detalle.montoCobro)", "totalCobro")
            .addSelect("usuario_crea.id","usuarioId")
            .where("venta_detalle.fecha >= :fecha_desde", { fecha_desde: start })
            .andWhere("venta_detalle.fecha < :fecha_hasta", { fecha_hasta: end })
            .andWhere("usuario_crea.id = :id_user", { id_user: userId })
            .getRawOne();
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