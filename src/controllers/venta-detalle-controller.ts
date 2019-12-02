import { PersonaRepo } from './../repositories/persona-repository';
import { VentaDetalleEntity } from './../entities/venta-detalle';
import { VentaDetalleRepo } from './../repositories/venta-details-repository';
import { UsuarioRepo } from './../repositories/usuario-repository';
import { VentaRepo } from './../repositories/venta-repository';
import { Request, Response } from "express";
import { inspect } from "util";
import { BaseResponse } from "../base-response";

export let getAll = async (req: Request, res: Response) => {
    let ventaDetalleRepo: VentaDetalleRepo = new VentaDetalleRepo();
    let baseResponse: BaseResponse = new BaseResponse();

    try {
        let ventaDetalle = await ventaDetalleRepo.getAll();
        baseResponse.success = true;
        baseResponse.response = ventaDetalle;
    }
    catch (e) {
        baseResponse.success = false;
        baseResponse.response = JSON.stringify(e);
    }

    res.send(baseResponse);
};

export let getOne = async (req: any, res: Response) => {
    let ventaDetalleRepo: VentaDetalleRepo = new VentaDetalleRepo();
    let baseResponse: BaseResponse = new BaseResponse();

    try {
        const id = req.params.id;
        let venta = await ventaDetalleRepo.getOne(id);
        baseResponse.success = true;
        baseResponse.response = venta;
    }
    catch (e) {
        baseResponse.success = false;
        baseResponse.response = JSON.stringify(e);
    }

    res.send(baseResponse);
};
export let save = async (req: Request, res: Response) => {
    //Create the Repo objects
    let ventaRepo: VentaRepo = new VentaRepo();
    let usuarioRepo: UsuarioRepo = new UsuarioRepo();
    let personaRepo: PersonaRepo = new PersonaRepo();
    let ventaDetalleRepo: VentaDetalleRepo = new VentaDetalleRepo();
    let ventaDetalleEntity: VentaDetalleEntity = new VentaDetalleEntity();
    let baseResponse: BaseResponse = new BaseResponse();

    try {
        let venta_req = req.body;
        ventaDetalleEntity.id = venta_req.id;
        ventaDetalleEntity.descripcion = venta_req.descripcion;
        ventaDetalleEntity.fecha = venta_req.fecha;
        ventaDetalleEntity.montoCobro = venta_req.montoCobro;
        //Get producto entity which is already peristed in DB
        ventaDetalleEntity.usuario_crea = await usuarioRepo.getOne(venta_req.usuarioCreaId);
        ventaDetalleEntity.persona = await personaRepo.getOne(venta_req.personaId);
        ventaDetalleEntity.venta = await ventaRepo.getOne(venta_req.ventaId);
        ventaDetalleEntity.fechaCreacion = new Date();

        let venta_saved = await ventaDetalleRepo.save(ventaDetalleEntity);
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
    let ventaDetalleRepo: VentaDetalleRepo = new VentaDetalleRepo();
    let baseResponse: BaseResponse = new BaseResponse();

    try {
        const id = req.params.id;
        let data = await ventaDetalleRepo.getOne(id);
        let result = await ventaDetalleRepo.delete(data);
        baseResponse.success = true;
        baseResponse.response = JSON.stringify('success');
    }
    catch (e) {
        baseResponse.success = false;
        baseResponse.response = JSON.stringify(inspect(e));
    }
    res.send(baseResponse);
}