import { PersonaRepo } from './../repositories/persona-repository';
import { VentaDetalleEntity } from './../entities/venta-detalle';
import { VentaEntity } from './../entities/venta-entity';
import { VentaDetalleRepo } from './../repositories/venta-details-repository';
import { ProductoRepo } from './../repositories/producto-repository';
import { UsuarioRepo } from './../repositories/usuario-repository';
import { VentaRepo } from './../repositories/venta-repository';
import { Request, Response } from "express";
import { inspect } from "util";
import { BaseResponse } from "../base-response";

export let getAll = async (req: Request, res: Response) => {
  let ventaRepo: VentaRepo = new VentaRepo();
  let baseResponse: BaseResponse = new BaseResponse();

  try {
    let ventas = await ventaRepo.getAll();
    baseResponse.success = true;
    baseResponse.response = ventas;
  }
  catch (e) {
    baseResponse.success = false;
    baseResponse.response = JSON.stringify(e);
  }

  res.send(baseResponse);
};

export let getDeuda = async (req: any, res: Response) => {
  let ventaRepo: VentaRepo = new VentaRepo();
  let baseResponse: BaseResponse = new BaseResponse();
  try {
    const id = req.params.id;
    let venta = await ventaRepo.getDeuda(id);
    baseResponse.success = true;
    baseResponse.response = venta;
  }
  catch (e) {
    baseResponse.success = false;
    baseResponse.response = JSON.stringify(e);
  }

  res.send(baseResponse);
};



export let getOne = async (req: any, res: Response) => {
  let ventaRepo: VentaRepo = new VentaRepo();
  let baseResponse: BaseResponse = new BaseResponse();

  try {
    const id = req.params.id;
    let venta = await ventaRepo.getOne(id);
    baseResponse.success = true;
    baseResponse.response = venta;
  }
  catch (e) {
    baseResponse.success = false;
    baseResponse.response = JSON.stringify(e);
  }

  res.send(baseResponse);
};

export let save_header = async (req: Request, res: Response) => {
  //Create the Repo objects
  let ventaRepo: VentaRepo = new VentaRepo();
  let usuarioRepo: UsuarioRepo = new UsuarioRepo();
  let productoRepo: ProductoRepo = new ProductoRepo();
  let personaRepo: PersonaRepo = new PersonaRepo();
  let ventaEntity: VentaEntity = new VentaEntity();
  let baseResponse: BaseResponse = new BaseResponse();

  try {
    let venta_req = req.body;
    ventaEntity.id = venta_req.id;
    ventaEntity.descripcion = venta_req.descripcion;
    ventaEntity.fecha = venta_req.fecha;
    ventaEntity.montoVenta = venta_req.montoVenta;
    ventaEntity.cuotaDiaria = venta_req.cuotaDiaria;
    //Get User Entity which is already persisted in DB
    ventaEntity.usuario_crea = await usuarioRepo.getOne(venta_req.usuarioCreaId);
    //ventaEntity.producto = await productoRepo.getOne(venta_req.productoId);
    ventaEntity.persona = await personaRepo.getOne(venta_req.personaId);
    ventaEntity.fechaCreacion = new Date();

    let venta_saved = await ventaRepo.save(ventaEntity);

    baseResponse.success = true;
    baseResponse.response = JSON.stringify('success');
  }
  catch (e) {
    baseResponse.success = false;
    baseResponse.response = JSON.stringify(inspect(e));
  }
  res.send(baseResponse);
}

export let save = async (req: Request, res: Response) => {
  //Create the Repo objects
  let ventaRepo: VentaRepo = new VentaRepo();
  let usuarioRepo: UsuarioRepo = new UsuarioRepo();
  let productoRepo: ProductoRepo = new ProductoRepo();
  let personaRepo: PersonaRepo = new PersonaRepo();
  let ventaDetalleRepo: VentaDetalleRepo = new VentaDetalleRepo();
  let ventaEntity: VentaEntity = new VentaEntity();
  let baseResponse: BaseResponse = new BaseResponse();

  try {
    let venta_req = req.body;
    ventaEntity.id = venta_req.id;
    ventaEntity.descripcion = venta_req.descripcion;
    ventaEntity.fecha = venta_req.fecha;
    ventaEntity.montoVenta = venta_req.montoVenta;
    ventaEntity.cuotaDiaria = venta_req.cuotaDiaria;
    //Get User Entity which is already persisted in DB
    ventaEntity.usuario_crea = await usuarioRepo.getOne(venta_req.usuarioCreaId);
    //ventaEntity.producto = await productoRepo.getOne(venta_req.productoId);
    ventaEntity.persona = await personaRepo.getOne(venta_req.personaId);
    ventaEntity.fechaCreacion = new Date();
    let venta_saved = await ventaRepo.save(ventaEntity);

    //Iterate through venta details and save venta details
    venta_req.venta_detalle.forEach(async (venta_det: any) => {
      let ventaDetalle: VentaDetalleEntity = new VentaDetalleEntity();
      ventaDetalle.id = venta_det.id;
      ventaDetalle.descripcion = venta_det.descripcion;
      ventaDetalle.fecha = venta_det.fecha;
      ventaDetalle.montoCobro = venta_det.montoCobro;
      //Get producto entity which is already peristed in DB
      ventaDetalle.usuario_crea = await usuarioRepo.getOne(venta_det.usuarioCreaId);
      ventaDetalle.persona = await personaRepo.getOne(venta_det.personaId);
      ventaDetalle.fechaCreacion = new Date();
      //Assign the saved venta entity !!!Important
      ventaDetalle.venta = venta_saved;
      //Save venta details
      let ventaDetalle_saved = await ventaDetalleRepo.save(ventaDetalle);
    });

    baseResponse.success = true;
    baseResponse.response = JSON.stringify('success');
  }
  catch (e) {
    baseResponse.success = false;
    baseResponse.response = JSON.stringify(inspect(e));
  }
  res.send(baseResponse);
}

export let save_Cascade = async (req: Request, res: Response) => {
  //Create the Repo objects
  let ventaRepo: VentaRepo = new VentaRepo();
  let usuarioRepo: UsuarioRepo = new UsuarioRepo();
  let personaRepo: PersonaRepo = new PersonaRepo();
  let productoRepo: ProductoRepo = new ProductoRepo();
  let ventaEntity: VentaEntity = new VentaEntity();
  let baseResponse: BaseResponse = new BaseResponse();

  try {
    let venta_req = req.body;
    ventaEntity.id = venta_req.id;
    ventaEntity.descripcion = venta_req.descripcion;
    ventaEntity.fecha = venta_req.fecha;
    ventaEntity.montoVenta = venta_req.montoVenta;
    ventaEntity.cuotaDiaria = venta_req.cuotaDiaria;
    //Get User Entity which is already persisted in DB
    ventaEntity.usuario_crea = await usuarioRepo.getOne(venta_req.usuarioCreaId);
    //ventaEntity.producto = await productoRepo.getOne(venta_req.productoId);
    ventaEntity.persona = await personaRepo.getOne(venta_req.personaId);
    ventaEntity.fechaCreacion = new Date();
    ventaEntity.venta_detalle = [];

    //Iterate through venta details and save venta details
    venta_req.venta_detalle.forEach(async (venta_det: any) => {
      let ventaDetalle: VentaDetalleEntity = new VentaDetalleEntity();
      ventaDetalle.id = venta_det.id;
      ventaDetalle.descripcion = venta_det.descripcion;
      ventaDetalle.fecha = venta_det.fecha;
      ventaDetalle.montoCobro = venta_det.montoCobro;
      //Get entity which is already peristed in DB
      ventaDetalle.persona = await personaRepo.getOne(venta_det.personaId);
      ventaDetalle.usuario_crea = await usuarioRepo.getOne(venta_det.usuarioCreaId);
      ventaDetalle.fechaCreacion = new Date();
      ventaEntity.venta_detalle.push(ventaDetalle);
    });

    //Save venta first
    let venta_saved = await ventaRepo.save(ventaEntity);

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
  let ventaRepo: VentaRepo = new VentaRepo();
  let baseResponse: BaseResponse = new BaseResponse();

  try {
    const id = req.params.id;
    let data = await ventaRepo.getOne(id);
    let result = await ventaRepo.delete(data);
    baseResponse.success = true;
    baseResponse.response = JSON.stringify('success');
  }
  catch (e) {
    baseResponse.success = false;
    baseResponse.response = JSON.stringify(inspect(e));
  }
  res.send(baseResponse);
}