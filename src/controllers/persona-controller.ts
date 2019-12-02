import { UsuarioRepo } from './../repositories/usuario-repository';
import { Request, Response } from "express";
import { inspect } from "util";
import { PersonaRepo } from "../repositories/persona-repository";
import { PersonaEntity } from "../entities/persona-entity";
import { BaseResponse } from "../base-response";

export let getAll = async (req: Request, res: Response) => {
    let personaRepo: PersonaRepo = new PersonaRepo();
    let baseResponse: BaseResponse = new BaseResponse();

    try {
        let personas = await personaRepo.getAll();
        baseResponse.success = true;
        baseResponse.response = personas;
    }
    catch (e) {
        baseResponse.success = false;
        baseResponse.response = JSON.stringify(e);
    }

    res.send(baseResponse);
};

export let getOne = async (req: any, res: Response) => {
    let personaRepo: PersonaRepo = new PersonaRepo();
    let baseResponse: BaseResponse = new BaseResponse();

    try {
        const id = req.params.id;
        let persona = await personaRepo.getOne(id);
        baseResponse.success = true;
        baseResponse.response = persona;
    }
    catch (e) {
        baseResponse.success = false;
        baseResponse.response = JSON.stringify(e);
    }

    res.send(baseResponse);
};

export let save = async (req: Request, res: Response) => {
    let personaRepo: PersonaRepo = new PersonaRepo();
    let personaEntity: PersonaEntity = new PersonaEntity();
    let baseResponse: BaseResponse = new BaseResponse();
    let usuarioRepo: UsuarioRepo = new UsuarioRepo();

    try {
        personaEntity.id = req.body.id;
        personaEntity.numeroDocumento = req.body.numeroDocumento;
        personaEntity.nombre = req.body.nombre;
        personaEntity.apellidos = req.body.apellidos;
        personaEntity.direccion = req.body.direccion;
        personaEntity.numeroCelular = req.body.numeroCelular;
        personaEntity.nombreCompleto = req.body.numeroDocumento + " " + req.body.nombre + " " + req.body.apellidos;
        //  personaEntity.usuario_crea = await usuarioRepo.getOne(req.body.usuarioCreaId);
        personaEntity.fechaCreacion = new Date();
        let result = await personaRepo.save(personaEntity);
        baseResponse.success = true;
        baseResponse.response = JSON.stringify('success');
    }
    catch (e) {
        baseResponse.success = false;
        baseResponse.response = JSON.stringify(inspect(e));
    }
    res.send(baseResponse);
}

export let remove = async (req: any, res: Response) => {
    let personaRepo: PersonaRepo = new PersonaRepo();
    let baseResponse: BaseResponse = new BaseResponse();

    try {
        const id = req.params.id;
        let persona = await personaRepo.getOne(id);
        let result = await personaRepo.delete(persona);
        baseResponse.success = true;
        baseResponse.response = JSON.stringify('success');
    }
    catch (e) {
        baseResponse.success = false;
        baseResponse.response = JSON.stringify(inspect(e));
    }
    res.send(baseResponse);
}