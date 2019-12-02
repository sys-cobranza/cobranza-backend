import { ProductoEntity } from "../entities/producto-entity";
import { getManager } from "typeorm";

export class ProductoRepo {

    getAll() {
        return getManager().getRepository(ProductoEntity)
            .createQueryBuilder("producto")
            .innerJoinAndSelect("producto.usuario_crea", "usuario")
            .getMany();
    }

    save(producto: ProductoEntity) {
        return getManager().getRepository(ProductoEntity).save(producto);
    }

    update(id: number, producto: ProductoEntity) {
        return getManager().getRepository(ProductoEntity).update(id, producto);
    }

    delete(producto: ProductoEntity) {
        return getManager().getRepository(ProductoEntity).remove(producto);
    }

    getOne(id: number) {
        return getManager().getRepository(ProductoEntity).findOne(id);
    }

    findOne(producto: ProductoEntity) {
        return getManager().getRepository(ProductoEntity).findOne(producto);
    }
}