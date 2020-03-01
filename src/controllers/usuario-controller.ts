import { Request, Response } from "express";
import { inspect } from 'util';
import { UsuarioEntity } from "../entities/usuario-entity";
import { UsuarioRepo } from "../repositories/usuario-repository";
import { BaseResponse } from "../base-response";
import { PersonaRepo } from "../repositories/persona-repository";

export let login = async (req: Request, res: Response) => {
  let usuarioRepo: UsuarioRepo = new UsuarioRepo();
  let baseResponse: BaseResponse = new BaseResponse();
  try {
    let userName = req.body.userName;
    let password = req.body.password;
    let user = await usuarioRepo.login(userName, password);
    baseResponse.success = true;
    if (!user) {
      baseResponse.success = false;
    }
    baseResponse.response = user;
  }
  catch (e) {
    baseResponse.success = false;
    baseResponse.response = JSON.stringify(e);
  }

  res.send(baseResponse);
};

export let getAll = async (req: Request, res: Response) => {
  let usuarioRepo: UsuarioRepo = new UsuarioRepo();
  let baseResponse: BaseResponse = new BaseResponse();

  try {
    let users = await usuarioRepo.getAll();
    baseResponse.success = true;
    baseResponse.response = users;
  }
  catch (e) {
    baseResponse.success = false;
    baseResponse.response = JSON.stringify(e);
  }

  res.send(baseResponse);
};

export let save = async (req: Request, res: Response) => {
  let usuarioRepo: UsuarioRepo = new UsuarioRepo();
  let personaRepo: PersonaRepo = new PersonaRepo();
  let userEntity: UsuarioEntity = new UsuarioEntity();
  let baseResponse: BaseResponse = new BaseResponse();

  try {
    userEntity.id = req.body.id;
    userEntity.userName = req.body.userName;
    userEntity.password = req.body.password;
    userEntity.estado = true;
    userEntity.persona = await personaRepo.getOne(req.body.personaId);
    let result = await usuarioRepo.save(userEntity);
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
  let usuarioRepo: UsuarioRepo = new UsuarioRepo();
  let baseResponse: BaseResponse = new BaseResponse();

  try {
    const id = req.params.id;
    let data = await usuarioRepo.getOne(id);
    let result = await usuarioRepo.delete(data);
    baseResponse.success = true;
    baseResponse.response = JSON.stringify('success');
  }
  catch (e) {
    baseResponse.success = false;
    baseResponse.response = JSON.stringify(inspect(e));
  }
  res.send(baseResponse);
}

