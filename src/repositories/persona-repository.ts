import { PersonaEntity } from './../entities/persona-entity';
import { getManager } from "typeorm";

export class PersonaRepo {

    getAll() {
        return getManager().getRepository(PersonaEntity).find();
    } 

    save(persona: PersonaEntity) {
        return getManager().getRepository(PersonaEntity).save(persona);
    }

    update(id: number, persona: PersonaEntity) {
        return getManager().getRepository(PersonaEntity).update(id, persona);
    }

    delete(persona: PersonaEntity) {
        return getManager().getRepository(PersonaEntity).remove(persona);
    }

    getOne(id: number) {
        return getManager().getRepository(PersonaEntity).findOne(id);
    }

    findOne(persona: PersonaEntity) {
        return getManager().getRepository(PersonaEntity).findOne(persona);
    }
}