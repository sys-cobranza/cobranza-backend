import { UsuarioEntity } from "../entities/usuario-entity";
import { getManager } from "typeorm";

export class UsuarioRepo {

    getAll() {
        return getManager().getRepository(UsuarioEntity)
            .createQueryBuilder("usuario")
            .innerJoinAndSelect("usuario.persona", "persona")
            .select()
            .getMany();
    }

    login(userName: string, password: string) {       
        return getManager().getRepository(UsuarioEntity)
        .createQueryBuilder("usuario")
        .innerJoinAndSelect("usuario.persona", "persona")      
        .where("usuario.userName = :user_name",  { user_name: userName })
        .andWhere("usuario.password = :pass", { pass: password })
        .andWhere("usuario.estado = :estado", { estado: true })
        .getOne();       
    }
    save(usuario: UsuarioEntity) {
        return getManager().getRepository(UsuarioEntity).save(usuario);
    }

    update(id: number, usuario: UsuarioEntity) {
        return getManager().getRepository(UsuarioEntity).update(id, usuario);
    }

    delete(usuario: UsuarioEntity) {
        return getManager().getRepository(UsuarioEntity).remove(usuario);
    }

    getOne(id: number) {
        return getManager().getRepository(UsuarioEntity).findOne(id);
    }

    findOne(usuario: UsuarioEntity) {
        return getManager().getRepository(UsuarioEntity).findOne(usuario);
    }
}