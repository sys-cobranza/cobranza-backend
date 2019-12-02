import { UsuarioRepo } from './../repositories/usuario-repository';
import { Request, Response } from "express";
import { inspect } from "util";
import { ProductoRepo } from "../repositories/producto-repository";
import { ProductoEntity } from "../entities/producto-entity";
import { BaseResponse } from "../base-response";

export let getAll = async (req: Request, res: Response) => {
  let productoRepo: ProductoRepo = new ProductoRepo();
  let baseResponse: BaseResponse = new BaseResponse();

  try {
    let products = await productoRepo.getAll();
    baseResponse.success = true;
    baseResponse.response = products;
  }
  catch (e) {
    baseResponse.success = false;
    baseResponse.response = JSON.stringify(e);
  }

  res.send(baseResponse);
};

export let getOne = async (req: any, res: Response) => {
  let productoRepo: ProductoRepo = new ProductoRepo();
  let baseResponse: BaseResponse = new BaseResponse();

  try {
    const id = req.params.id;
    let producto = await productoRepo.getOne(id);
    baseResponse.success = true;
    baseResponse.response = producto;
  }
  catch (e) {
    baseResponse.success = false;
    baseResponse.response = JSON.stringify(e);
  }

  res.send(baseResponse);
};

export let save = async (req: Request, res: Response) => {
  let productoRepo: ProductoRepo = new ProductoRepo();
  let productEntity: ProductoEntity = new ProductoEntity();
  let baseResponse: BaseResponse = new BaseResponse();
  let usuarioRepo: UsuarioRepo = new UsuarioRepo();
  try {
    productEntity.id = req.body.id;
    productEntity.denominacion = req.body.denominacion;
    productEntity.precio = req.body.precio;
    productEntity.categoria = req.body.categoria;
    productEntity.usuario_crea = await usuarioRepo.getOne(req.body.usuarioCreaId);
    productEntity.fechaCreacion = new Date();
    let result = await productoRepo.save(productEntity);
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
  let productoRepo: ProductoRepo = new ProductoRepo();
  let baseResponse: BaseResponse = new BaseResponse();

  try {
    const id = req.params.id;
    let data = await productoRepo.getOne(id);
    let result = await productoRepo.delete(data);
    baseResponse.success = true;
    baseResponse.response = JSON.stringify('success');
  }
  catch (e) {
    baseResponse.success = false;
    baseResponse.response = JSON.stringify(inspect(e));
  }
  res.send(baseResponse);
}